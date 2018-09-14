"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const permissions_1 = require("../../shared/Permissions/permissions");
const transactionTypes_1 = require("../../model/codes/transactionTypes");
function balanceInquiry(balanceInquiryModel, walletContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield permissions_1.canExecute(walletContext.permissions, [transactionTypes_1.TransactionTypes.BALANCEINQUIRY, transactionTypes_1.TransactionTypes.UNLOAD], () => balanceInquiryModel.lookup(), () => [statusCodes_1.StatusCodes.Forbidden, {
                message: 'Lack Required Permissions',
            }]);
    });
}
exports.balanceInquiry = balanceInquiry;
