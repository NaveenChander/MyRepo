"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../codes/errorCodes");
const statusCodes_1 = require("../codes/statusCodes");
class WalletAccount {
    constructor(patronWalletId, accountId, tenantId, balance, limit, externalAccountId) {
        if (patronWalletId === undefined
            || accountId === undefined
            || tenantId === ''
            || tenantId === undefined
            || balance === undefined
            || limit === undefined
            || externalAccountId === ''
            || externalAccountId === undefined) {
            throw [statusCodes_1.StatusCodes.Conflict,
                errorCodes_1.ErrorCodes.invalidWalletAccountParameters];
        }
        this.PatronWalletId = patronWalletId;
        this.AccountId = accountId;
        this.TenantId = tenantId;
        this.Balance = balance;
        this.Limit = limit;
        this.ExternalAccountId = externalAccountId.trim();
    }
    get patronWalletId() { return this.PatronWalletId; }
    get accountId() { return this.AccountId; }
    get tenantId() { return this.TenantId; }
    get balance() { return this.Balance; }
    get limit() { return this.Limit; }
    get externalAccountId() { return this.ExternalAccountId; }
}
exports.WalletAccount = WalletAccount;
