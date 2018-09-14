"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
const unloadCash_1 = require("../../../../../core/model/unload/unloadCash");
const unload_1 = require("../../../../../core/feature/unload/unload");
function unload(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const tenantId = ctx.params.tenantId;
        const transactiontype = ctx.request.body.TransactionType;
        const operatorTranscationId = ctx.request.body.operatorTranscationId;
        const externalUserId = ctx.request.query.userid;
        const amount = ctx.request.body.Amount;
        const fundingType = ctx.request.body.fundingType;
        const propertyCode = ctx.request.body.propertyCode;
        let unLoadCash;
        try {
            unLoadCash = new unloadCash_1.UnloadCash(tenantId, externalUserId, propertyCode, transactiontype, operatorTranscationId, amount, fundingType, ctx.walletContext);
        }
        catch (err) {
            return [statusCodes_1.StatusCodes.BadRequest, {}];
        }
        const result = yield unload_1.unloadCash(unLoadCash, ctx.walletContext);
        const transResults = result[1];
        const sgResponse = {
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
        return [statusCodes_1.StatusCodes.OK, sgResponse];
    });
}
exports.unload = unload;
