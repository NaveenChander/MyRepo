"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authToken_1 = require("../../../../../core/model/authToken");
const errorCodes_1 = require("../../../../../core/model/codes/errorCodes");
function createRequestParameters(tenantId, walletId, token) {
    const tokenObj = JSON.parse(token);
    if (tenantId !== tokenObj.tenantId
        || walletId !== tokenObj.walletId) {
        return [errorCodes_1.ErrorCodes.invalidWalletAccountOrTenantIdMismatch, undefined];
    }
    try {
        const authToken = new authToken_1.AuthorizationToken(tokenObj.tenantId, tokenObj.cmsAccountId, tokenObj.externalPlayerCardNumber, tokenObj.walletId);
        return [errorCodes_1.ErrorCodes.OK, authToken];
    }
    catch (err) {
        return [errorCodes_1.ErrorCodes.invalidAuthorizationTokenParams, undefined];
    }
}
exports.createRequestParameters = createRequestParameters;
