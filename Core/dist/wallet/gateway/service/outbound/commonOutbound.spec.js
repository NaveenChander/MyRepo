"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const transactionTypes_1 = require("../../../../wallet/core/model/codes/transactionTypes");
const statusCodes_1 = require("../../../../wallet/core/model/codes/statusCodes");
const actionTypes_1 = require("../../../../wallet/core/model/actionTypes");
const test = require("../../../../wallet/core/shared/testutil/contextHelper.spec");
const commonOutbound_1 = require("./commonOutbound");
const walletContext = test.getWalletContext([transactionTypes_1.TransactionTypes.REGISTER]);
const walletAccountId = 1231548;
const actionType = actionTypes_1.ActionTypes.LinkWallet;
const service = new commonOutbound_1.CommonOutbound(walletContext, walletAccountId, actionType);
describe(`Invoke Outbound Service`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    it(`Constructor Happy Path`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield new commonOutbound_1.CommonOutbound(walletContext, walletAccountId, actionType);
            // pass
        }
        catch (error) {
            fail();
        }
    }));
    it(`Constructor with undefined walletContext`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield new commonOutbound_1.CommonOutbound(undefined, walletAccountId, actionType);
            fail();
        }
        catch (error) {
            // pass
        }
    }));
    it(`Constructor with undefined wallet id`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield new commonOutbound_1.CommonOutbound(walletContext, undefined, actionType);
            fail();
        }
        catch (error) {
            // pass
        }
    }));
    it(`Call CommonOutbound`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield service.invoke();
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
}));
