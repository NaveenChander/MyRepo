"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const newWalletWithAccounts_1 = require("./newWalletWithAccounts");
const transactionTypes_1 = require("../../model/codes/transactionTypes");
const patron_1 = require("../../model/patron");
const contextHelper_spec_1 = require("../../shared/testutil/contextHelper.spec");
/** Test Data */
const walletContext = contextHelper_spec_1.getWalletContext([transactionTypes_1.TransactionTypes.REGISTER]);
const patron = new patron_1.Patron('123456', 'external243432', 'everi', 'wallet', 'm', '27-08-1992', 'Tidal park', 'Chennai', 'Tamilnadu', 'India', '600052', 'name@someothermail.com', '123456789', 'ssnnumber01', [{}]);
const newPatronAcc = new newWalletWithAccounts_1.NewWalletWithAccounts(walletContext, patron);
describe('New Wallet Accounts - Validate Constructor', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    it(`Happy path`, () => {
        try {
            const res = new newWalletWithAccounts_1.NewWalletWithAccounts(walletContext, patron);
            // pass
        }
        catch (err) {
            fail();
        }
    });
    it('Constructor with undefined walletContext reference', () => {
        try {
            const res = new newWalletWithAccounts_1.NewWalletWithAccounts(undefined, patron);
            fail('Should have failed');
        }
        catch (err) {
            // pass
        }
    });
    it('Constructor with undefined parameter', () => {
        try {
            const res = new newWalletWithAccounts_1.NewWalletWithAccounts(undefined, patron);
            fail();
        }
        catch (err) {
            // pass
        }
    });
}));
describe('New Wallet Accounts - Patron registration', () => {
    // New account test case
    it(`should return status code ${statusCodes_1.StatusCodes.OK}
        for new wallet information`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield newPatronAcc.createNewWallet();
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
    // Existing account test case
    it(`should return status code ${statusCodes_1.StatusCodes.OK}
        for existing wallet information`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield newPatronAcc.createNewWallet();
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
});
