"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const apiGateway_1 = require("../../../gateway/service/outbound/apiGateway");
class NewWalletWithAccounts {
    constructor(walletContext, patron) {
        if (walletContext === undefined
            || patron === undefined) {
            const err = [statusCodes_1.StatusCodes.InternalServerError, {}];
            throw err;
        }
        this.WalletContext = walletContext;
        this.Patron = patron;
    }
    createNewWallet() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.WalletContext.dep.dal.RegisterDal.CreatePatronWallet(this.WalletContext, this.Patron);
            const newWalletResults = result[1];
            if (result[0] === statusCodes_1.StatusCodes.OK) {
                const walletAccounts = newWalletResults.Account;
                for (const walletAccount of walletAccounts) {
                    if (!walletAccount.IsInternalAccount) {
                        const apiGateway = new apiGateway_1.ApiGateway(this.WalletContext, walletAccount.Account_ID);
                        const externalResponse = yield apiGateway.linkWallet();
                    }
                }
            }
            return [statusCodes_1.StatusCodes.OK, newWalletResults];
        });
    }
}
exports.NewWalletWithAccounts = NewWalletWithAccounts;
