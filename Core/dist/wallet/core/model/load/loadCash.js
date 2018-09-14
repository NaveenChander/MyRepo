"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errorCodes_1 = require("../codes/errorCodes");
class LoadCash {
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
        if (transactionType.toLocaleLowerCase() !== 'deposit'
            || transactionType === undefined) {
            err = errorCodes_1.ErrorCodes.invalidTenantId;
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
    loadFromWallet() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.walletContext.dep.dal.LoadDal.loadWallet(this.tenantId, this.externalUserId, this.propertyCode, this.transactionType, this.operationalTransactionId, this.amount, this.fundingType, this.walletContext);
        });
    }
}
exports.LoadCash = LoadCash;
