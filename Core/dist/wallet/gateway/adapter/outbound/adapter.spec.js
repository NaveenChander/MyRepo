"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const transactionTypes_1 = require("../../../core/model/codes/transactionTypes");
const test = require("../../../core/shared/testutil/contextHelper.spec");
const actionTypes_1 = require("../../../Core/model/actionTypes");
const Adapter = require("./adapter");
const adapter = Adapter;
/** Test Data */
const newWalletContext = test.getWalletContext([transactionTypes_1.TransactionTypes.REGISTER]);
describe(`Testing Adapter Route`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    it(`Happy Path`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield adapter.route(newWalletContext, 123456, actionTypes_1.ActionTypes.LinkWallet);
        }
        catch (error) {
            // pass
            fail();
        }
    }));
    it(`Passing undefined walletContext`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield adapter.route(undefined, 123456, actionTypes_1.ActionTypes.LinkWallet);
            fail();
        }
        catch (error) {
            // pass
        }
    }));
    it(`Passing undefined walletAccountID`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield adapter.route(newWalletContext, undefined, actionTypes_1.ActionTypes.LinkWallet);
            fail();
        }
        catch (error) {
            // pass
        }
    }));
}));
