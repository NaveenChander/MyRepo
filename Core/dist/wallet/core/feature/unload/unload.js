"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const permissions_1 = require("../../shared/permissions/permissions");
const transactionTypes_1 = require("../../model/codes/transactionTypes");
function unloadCash(unloadcash, walletContext) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield permissions_1.canExecute(walletContext.permissions, [transactionTypes_1.TransactionTypes.UNLOAD], () => unloadcash.unloadFromWallet(), () => [statusCodes_1.StatusCodes.Forbidden, {}]);
    });
}
exports.unloadCash = unloadCash;
