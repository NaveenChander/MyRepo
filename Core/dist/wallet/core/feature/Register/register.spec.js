"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../model/codes/statusCodes");
const transactionTypes_1 = require("../../model/codes/transactionTypes");
const register_1 = require("./register");
const contextHelper_spec_1 = require("../../shared/testutil/contextHelper.spec");
describe('Register - Validate Permissions', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Check with valid permission
    it(`should return status code ${statusCodes_1.StatusCodes.OK},
        if permission exists`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield register_1.register(contextHelper_spec_1.getWallet([transactionTypes_1.TransactionTypes.REGISTER]));
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
    // Check with invalid permission
    it(`should return status code ${statusCodes_1.StatusCodes.Forbidden},
        if permission doesn't exists`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield register_1.register(contextHelper_spec_1.getWallet([transactionTypes_1.TransactionTypes.LOAD]));
        expect(result[0]).toBe(statusCodes_1.StatusCodes.Forbidden);
    }));
    // Check with valid & multiple permissions
    it(`should return status code ${statusCodes_1.StatusCodes.OK},
        if permission exists in array lists`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield register_1.register(contextHelper_spec_1.getWallet([
            transactionTypes_1.TransactionTypes.REGISTER,
            transactionTypes_1.TransactionTypes.LOAD,
        ]));
        expect(result[0]).toBe(statusCodes_1.StatusCodes.OK);
    }));
    // Check with invalid & multiple permissions
    it(`should return status code ${statusCodes_1.StatusCodes.Forbidden},
        if permission doesn't exists in array lists`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield register_1.register(contextHelper_spec_1.getWallet([
            transactionTypes_1.TransactionTypes.UNLOAD,
            transactionTypes_1.TransactionTypes.LOAD,
        ]));
        expect(result[0]).toBe(statusCodes_1.StatusCodes.Forbidden);
    }));
    // Check without empty permissions
    it(`should return status code ${statusCodes_1.StatusCodes.Forbidden},
        if permission list is empty`, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield register_1.register(contextHelper_spec_1.getWallet([]));
        expect(result[0]).toBe(statusCodes_1.StatusCodes.Forbidden);
    }));
}));
