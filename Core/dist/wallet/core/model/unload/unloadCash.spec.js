"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../codes/errorCodes");
const unloadCash_1 = require("./unloadCash");
describe('core/model/unload/unloadCash', (() => {
    it('Negative Value for the Amount', (() => {
        let error;
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
            everiPatronId: '123',
        };
        try {
            const unloadcash = new unloadCash_1.UnloadCash(1, '1', '1', 'withdrawl', '3', -300, 'cash', walletContext);
        }
        catch (err) {
            error = err;
        }
        expect(error).toContain(errorCodes_1.ErrorCodes.invalidAmount);
    }));
    it('TenantID  is not defined properly', (() => {
        let error;
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
            everiPatronId: '123',
        };
        try {
            const unloadcash = new unloadCash_1.UnloadCash(null, '1', '1', 'withdrawl', '3', 300, 'cash', walletContext);
        }
        catch (err) {
            error = err;
        }
        expect(error).toContain(errorCodes_1.ErrorCodes.invalidTenantId);
    }));
    it('Unload Object Created Properly', (() => {
        let error;
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
            everiPatronId: '123',
        };
        let unloadcash;
        try {
            unloadcash = new unloadCash_1.UnloadCash(1, '1', '1', 'withdrawl', '3', 300, 'cash', walletContext);
        }
        catch (err) {
            error = err;
        }
        expect(unloadcash).not.toBeNull();
    }));
}));
