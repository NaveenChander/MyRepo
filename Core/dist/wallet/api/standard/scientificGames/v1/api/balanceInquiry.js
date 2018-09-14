"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const balanceInquiry_1 = require("../../../../../Core/feature/BalanceInquiry/balanceInquiry");
const balanceInquiryWithExternalId_1 = require("../../../../../core/model/balanceInquiry/balanceInquiryWithExternalId");
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
function balanceInquiry(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let result;
        const userId = ctx.request.query.userid;
        let balanceInquiryCashWithExternalId;
        try {
            balanceInquiryCashWithExternalId =
                new balanceInquiryWithExternalId_1.BalanceInquiryWithExternalId(userId, ctx.walletContext);
        }
        catch (err) {
            return [statusCodes_1.StatusCodes.BadRequest, {}];
        }
        result = yield balanceInquiry_1.balanceInquiry(balanceInquiryCashWithExternalId, ctx.walletContext);
        let sgResponse;
        if (result[0] !== statusCodes_1.StatusCodes.OK) {
            sgResponse = {
                Data: undefined,
                Success: 'false',
                Errors: [
                    result.toString(),
                ],
            };
            return [statusCodes_1.StatusCodes.OK, sgResponse];
        }
        const biResults = result[1];
        sgResponse = {
            Data: {
                UserId: biResults.externalAccountId,
                Balance: biResults.balance,
                Currency: 'USD',
                UserBonuses: null,
            },
            Success: 'true',
            Errors: [
                null,
            ],
        };
        return [statusCodes_1.StatusCodes.OK, sgResponse];
    });
}
exports.balanceInquiry = balanceInquiry;
