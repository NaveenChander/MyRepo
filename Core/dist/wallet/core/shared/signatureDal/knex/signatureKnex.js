"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../model/codes/statusCodes");
const trim_1 = require("../../stringFunctions/trim");
const errorCodes_1 = require("../../../model/codes/errorCodes");
const databaseErrors_1 = require("../../knex/databaseErrors");
class KnexSignatureDAL {
    constructor(walletDBConnection) {
        if (walletDBConnection === undefined) {
            throw [errorCodes_1.ErrorCodes.invalidDatabaseConnection, {}];
        }
        this.WalletDBConnection = walletDBConnection;
    }
    lookupSignatureParams(apiKey, tenantId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const permissions = [];
            let secretKey = '';
            return yield this.WalletDBConnection
                .distinct()
                .select('tExtIntPerm.OperationType_Code', 'tKeyStore.Secret_Key')
                .from('KeyStore as tKeyStore')
                .innerJoin('MerchantAccount_Group as tMerchActGrp', 'tMerchActGrp.MA_Group_ID', 'tKeyStore.MA_Group_ID')
                .innerJoin('ExternalInterface_Merchant_Map as tExtIntMerchMap', 'tExtIntMerchMap.Merchant_ID', 'tMerchActGrp.Merchant_ID')
                .innerJoin('ExternalInterfacePermissions as tExtIntPerm', 'tExtIntPerm.ExternalInterface_ID', 'tExtIntMerchMap.ExternalInterface_ID')
                .where({
                'tKeyStore.API_key': apiKey,
                'tKeyStore.Tenant_ID': tenantId
            })
                .then((result) => {
                if (result.length === 0) {
                    return [statusCodes_1.StatusCodes.NotFound,
                        errorCodes_1.ErrorCodes.apiKeyNotFoundOrTenantIdMismatch];
                }
                result.map((item) => { permissions.push(item.OperationType_Code); });
                secretKey = result[0].Secret_Key;
                return [statusCodes_1.StatusCodes.OK, {
                        permissions: permissions.map((item) => {
                            return trim_1.trimAll(item);
                        }),
                        secretKey,
                    }];
            })
                .catch((err) => {
                console.log(err);
                return databaseErrors_1.createErrorResponse(err);
            });
        });
    }
}
exports.KnexSignatureDAL = KnexSignatureDAL;
