"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const adapterForLinkWallet_1 = require("./adapterForLinkWallet");
const actionTypes_1 = require("../../../../Core/model/actionTypes");
describe(`Adapter for Link Wallet`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const externalInterfaceDate = {
        Vendor_Name: 'scientificGames',
        Action_Type: actionTypes_1.ActionTypes.LinkWallet,
    };
    it(`Calling execute method with valid vendor and action`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield adapterForLinkWallet_1.execute(externalInterfaceDate);
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
    it(`Calling execute method with unknown vendor`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        externalInterfaceDate.Vendor_Name = 'UnknownVendor';
        const result = yield adapterForLinkWallet_1.execute(externalInterfaceDate);
        expect(result[0]).toBe(statusCodes_1.StatusCodes.InternalServerError);
    }));
}));
