"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
const loadCash_1 = require("../../../../../core/model/load/loadCash");
const load_1 = require("../../../../../core/feature/load/load");
function load(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const tenantId = ctx.params.tenantId;
        const transcationtype = ctx.request.body.TransactionType;
        const operatorTranscationId = ctx.request.body.operatorTranscationId;
        const externalUserId = ctx.request.query.userid;
        const amount = ctx.request.body.Amount;
        const fundingType = ctx.request.body.fundingType;
        const propertyCode = ctx.request.body.propertyCode;
        let loadCash;
        console.log(externalUserId);
        try {
            loadCash = new loadCash_1.LoadCash(tenantId, externalUserId, propertyCode, transcationtype, operatorTranscationId, amount, fundingType, ctx.walletContext);
        }
        catch (err) {
            return [statusCodes_1.StatusCodes.BadRequest, {}];
        }
        const result = yield load_1.loadCash(loadCash, ctx.walletContext);
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
exports.load = load;
