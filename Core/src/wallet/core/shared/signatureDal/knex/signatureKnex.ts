import * as knex from 'knex';
import { response, responsePromise } from '../../../model/types/response';
import { StatusCodes } from '../../../model/codes/statusCodes';
import { trimAll } from '../../stringFunctions/trim';
import { ErrorCodes } from '../../../model/codes/errorCodes';
import { createErrorResponse } from '../../knex/databaseErrors';
import { SignatureDAL } from '../signature';

export class KnexSignatureDAL implements SignatureDAL
{
    private WalletDBConnection: knex;

    constructor(walletDBConnection: any)
    {
        if (walletDBConnection === undefined)
        {
            throw [ErrorCodes.invalidDatabaseConnection, {}];
        }
        this.WalletDBConnection = walletDBConnection;
    }

    public async lookupSignatureParams(
        apiKey: string,
        tenantId: string): Promise<any>
    {
        const permissions: string[] = [];
        let secretKey: string = '';

        return await this.WalletDBConnection
            .distinct()
            .select('tExtIntPerm.OperationType_Code', 'tKeyStore.Secret_Key')
            .from('KeyStore as tKeyStore')
            .innerJoin('MerchantAccount_Group as tMerchActGrp',
                'tMerchActGrp.MA_Group_ID',
                'tKeyStore.MA_Group_ID')
            .innerJoin('ExternalInterface_Merchant_Map as tExtIntMerchMap',
                'tExtIntMerchMap.Merchant_ID',
                'tMerchActGrp.Merchant_ID')
            .innerJoin('ExternalInterfacePermissions as tExtIntPerm',
                'tExtIntPerm.ExternalInterface_ID',
                'tExtIntMerchMap.ExternalInterface_ID')
            .where({
                'tKeyStore.API_key': apiKey,
                'tKeyStore.Tenant_ID': tenantId})
            .then((result) =>
            {
                if (result.length === 0)
                {
                    return [StatusCodes.NotFound,
                        ErrorCodes.apiKeyNotFoundOrTenantIdMismatch];
                }

                result.map((item: {
                    'OperationType_Code': string,
                    'Secret_Key': string,
                    }) => { permissions.push(item.OperationType_Code); });

                secretKey = result[0].Secret_Key;
                return [StatusCodes.OK, {
                    permissions : permissions.map((item) =>
                    {
                        return trimAll(item);
                    }),
                    secretKey,
                }];
            })
            .catch((err: any) =>
            {
                console.log(err);
                return createErrorResponse(err);
            });
    }
}
