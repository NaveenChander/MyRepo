import { TransactionsCashResults } from './../../../../../core/model/unload/unloadCashResults';
import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { Unload } from '../../../../../core/model/unload/unload';
import { UnloadCash } from '../../../../../core/model/unload/unloadCash';
import {unloadCash as coreUnloadCash} from '../../../../../core/feature/unload/unload';
export async function unload(ctx: any)
{
    const tenantId = ctx.params.tenantId;
    const transactiontype: string = ctx.request.body.TransactionType;
    const operatorTranscationId: string =
        ctx.request.body.operatorTranscationId;
    const externalUserId: string  = ctx.request.query.userid;
    const amount: number = ctx.request.body.Amount;
    const fundingType = ctx.request.body.fundingType;
    const propertyCode  = ctx.request.body.propertyCode;
    let unLoadCash: Unload;

    try
    {
        unLoadCash = new UnloadCash(
        tenantId, externalUserId, propertyCode,
        transactiontype, operatorTranscationId,
        amount, fundingType, ctx.walletContext);
    }
    catch (err)
    {
        return [StatusCodes.BadRequest, {}];
    }
    const result: any  = await coreUnloadCash(unLoadCash, ctx.walletContext);
    const transResults: TransactionsCashResults = result[1];
    const sgResponse: {
        Data: {
            UserId: string,
            Balance: number,
            Currency: string,
            Amount: string,
            TransactionId: string,
        },
        Success: string,
        Errors: string [],
    } =
    {
        Data: {
            UserId: transResults.walletAccount.externalAccountId,
            Balance: transResults.walletAccount.balance,
            Currency: '$',
            Amount: this.amount,
            TransactionId: transResults.transactionId,
        },
        Success: 'true',
        Errors: [
            null,
        ],
    };
    return [StatusCodes.OK, sgResponse];
}
