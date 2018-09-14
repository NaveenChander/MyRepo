"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../Model/codes/statusCodes");
const permissions_1 = require("../../shared/permissions/permissions");
const transactionTypes_1 = require("../../model/codes/transactionTypes");
function register(newWallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield permissions_1.canExecute(newWallet.WalletContext.permissions, [transactionTypes_1.TransactionTypes.REGISTER], () => newWallet.createNewWallet(), () => [statusCodes_1.StatusCodes.Forbidden, {}]);
    });
}
exports.register = register;
