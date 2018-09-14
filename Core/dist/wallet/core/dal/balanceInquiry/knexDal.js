"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const walletAccount_1 = require("../../model/db/walletAccount");
const errorCodes_1 = require("../../model/codes/errorCodes");
const databaseErrors_1 = require("../../shared/knex/databaseErrors");
class KnexBalanceInquiryDal {
    constructor(connection) {
        if (connection === undefined) {
            throw [statusCodes_1.StatusCodes.InternalServerError,
                errorCodes_1.ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connection;
    }
    BalanceInquiryWithExternalId(externalId, walletContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.connection
                .from('PatronWalletAccount as tPatWalAct')
                .select('tPatWalAct.PatronWallet_ID', 'tPatWalAct.Account_ID', 'tPatWalAct.Tenant_ID', 'tPatWalAct.Balance', 'tPatWalAct.Limit', // Daily limit
            'tPatWalAct.ExternalAccount_ID')
                .where({
                'tPatWalAct.ExternalAccount_ID': externalId,
                'tPatWalAct.Tenant_ID': walletContext.tenantId
            })
                .then((results) => {
                if (results.length === 0) {
                    return [statusCodes_1.StatusCodes.NotFound,
                        errorCodes_1.ErrorCodes.invalidWalletAccountOrTenantIdMismatch];
                }
                if (results.length > 1) {
                    return [statusCodes_1.StatusCodes.Conflict,
                        errorCodes_1.ErrorCodes.invalidDatabaseResultLength];
                }
                try {
                    const walletAccount = new walletAccount_1.WalletAccount(results[0].PatronWallet_ID, results[0].Account_ID, results[0].Tenant_ID, results[0].Balance, results[0].Limit, results[0].ExternalAccount_ID);
                    return [statusCodes_1.StatusCodes.OK, walletAccount];
                }
                catch (err) {
                    console.log(err);
                    return [statusCodes_1.StatusCodes.Conflict, err[1]];
                }
            })
                .catch((err) => {
                return databaseErrors_1.createErrorResponse(err);
            });
        });
    }
}
exports.KnexBalanceInquiryDal = KnexBalanceInquiryDal;
