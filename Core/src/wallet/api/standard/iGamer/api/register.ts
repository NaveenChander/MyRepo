import { register as coreRegister } from '../../../../Core/feature/Register/register';
import { Account } from '../../../../core/model/account';
import { ErrorCodes } from '../../../../core/model/codes/errorCodes';
import { NewWallet } from '../../../../Core/Model/Register/newWallet';
import { NewWalletWithAccounts } from '../../../../Core/Model/Register/newWalletWithAccounts';
import { responsePromise } from '../../../../Core/Model/types/response';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';
import { WalletContext } from '../../../../core/model/types/walletContext';
import { KnexDAL } from '../../../../core/dal/knexDal';

import { to_json as toJson } from 'xmljson';
import * as toXml from 'jsontoxml';

export async function register(ctx: any)
{
    const jsonBody = xmlToJson(ctx.request.rawBody);
    const patron: any =  jsonBody;

    const walletContext: WalletContext = {
        tenantId : ctx.query.tenant_id,
        permissions : ctx.permissions,
        dep : { dal : new KnexDAL(ctx.walletDBConnection) },
        everiPatronId : patron.Registration.externalKey,
    };

    const newWalletWithAccounts: NewWallet =
        new NewWalletWithAccounts(walletContext, patron.Registration);

    const result: [StatusCodes, object] =
        await coreRegister(newWalletWithAccounts);

    switch (result[0])
    {
        case StatusCodes.OK:
        {
            ctx.response.body = jsonToXml(
                mapResponseData(result[1]),
            );
            break;
        }
        case StatusCodes.NotFound:
        {
            ctx.notFound('Wallet Not Found');
            break;
        }
        case StatusCodes.Forbidden:
        {
            ctx.forbidden();
            break;
        }
    }

}

export async function lookupiGamerSecretKey(
    ctx: any)
    : responsePromise
    {
        if (ctx.query.tenant_id === null || ctx.query.tenant_id === undefined
            || ctx.query.tenant_id === '')
        {
             return [StatusCodes.BadRequest, ErrorCodes.invalidTenantId];
        }

        if (ctx.permissions === null || ctx.permissions === undefined)
        {
             return [StatusCodes.BadRequest, ErrorCodes.invalidPermission];
        }

        const walletContext: WalletContext = {
            tenantId : ctx.query.tenant_id,
            permissions : ctx.permissions,
            dep : { dal : new KnexDAL(ctx.walletDBConnection) },
            everiPatronId : undefined,
        };

        return await walletContext.dep.dal.RegisterDal.
                        LookupSecretKey(walletContext);
}

function mapResponseData(responseData: any)
{
    for (const resData of responseData.Account)
    {
        if (resData.Account_Name === 'Everi  Cash')
        {
            const obj = {} as Account;
            obj.id = resData.Account_ID;
            obj.name = resData.Account_Name;
            obj.currency = 'USD';
            obj.balance = resData.Limit;
            responseData.Account = obj;
        }
    }
    return responseData;
}

function xmlToJson(xml: any)
{

    let result;
    toJson(xml, (error: any, json: any) =>
    {
        if (error)
        {
            console.log('Conversion Error', error);
        }
        result = json;
    });
    return result;
}

function jsonToXml(json: any)
{

    const xml = toXml({
        Wallet: json,
    });
    return xml;
}
