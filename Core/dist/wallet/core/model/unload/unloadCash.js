"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errorCodes_1 = require("../codes/errorCodes");
const statusCodes_1 = require("../codes/statusCodes");
class UnloadCash {
    constructor(tenantId, externalUserId, propertyCode, transactionType, operationalTransactionId, amount, fundingType, walletContext) {
        let err;
        if (tenantId === null || tenantId === undefined) {
            err = errorCodes_1.ErrorCodes.invalidTenantId;
            throw err;
        }
        if (amount < 0) {
            err = errorCodes_1.ErrorCodes.invalidAmount;
            throw err;
        }
        if (transactionType.toLocaleLowerCase() !== 'withdrawl'
            || transactionType === undefined) {
            err = errorCodes_1.ErrorCodes.invalidTranscationType;
            throw err;
        }
        if (externalUserId === ''
            || externalUserId === undefined) {
            err = errorCodes_1.ErrorCodes.invalidExternalpatronId;
            throw err;
        }
        this.tenantId = tenantId;
        this.externalUserId = externalUserId;
        this.propertyCode = propertyCode;
        this.transactionType = transactionType;
        this.operationalTransactionId = operationalTransactionId;
        this.amount = amount;
        this.fundingType = fundingType;
        this.walletContext = walletContext;
    }
    unloadFromWallet() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.walletContext.dep.dal.UnloadDal.unloadWallet(this.tenantId, this.externalUserId, this.propertyCode, this.transactionType, this.operationalTransactionId, this.amount, this.fundingType, this.walletContext);
            if (result[0] !== statusCodes_1.StatusCodes.OK) {
                // handle error stuff
            }
            return [statusCodes_1.StatusCodes.OK, result[1]];
        });
    }
}
exports.UnloadCash = UnloadCash;
