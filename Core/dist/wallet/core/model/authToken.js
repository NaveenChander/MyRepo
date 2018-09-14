"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../model/codes/errorCodes");
class AuthorizationToken {
    constructor(TenantId, CMSAccountId, ExternalPlayerCardNumber, WalletId) {
        if (TenantId === ''
            || TenantId === undefined
            || CMSAccountId === ''
            || CMSAccountId === undefined
            || ExternalPlayerCardNumber === ''
            || ExternalPlayerCardNumber === undefined
            || WalletId === ''
            || WalletId === undefined) {
            throw [errorCodes_1.ErrorCodes.invalidAuthorizationTokenParams, {}];
        }
    }
    get tenantId() { return this.TenantId; }
    get cmsAccountId() { return this.CMSAccountId; }
    get externalPlayerCardNumber() { return this.ExternalPlayerCardNumber; }
    get walletId() { return this.WalletId; }
}
exports.AuthorizationToken = AuthorizationToken;
