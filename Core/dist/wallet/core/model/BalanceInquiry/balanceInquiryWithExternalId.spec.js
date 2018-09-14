"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const balanceInquiryWithExternalId_1 = require("./balanceInquiryWithExternalId");
describe('core/model/balanceInquiryCashWithExternalId', () => {
    it('Testing the constructor happy case', () => {
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
        };
        try {
            const test = new balanceInquiryWithExternalId_1.BalanceInquiryWithExternalId('string', walletContext);
            // pass
        }
        catch (err) {
            fail(err);
        }
    });
    it('Testing the constructor with undefined external ID', () => {
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
        };
        try {
            const test = new balanceInquiryWithExternalId_1.BalanceInquiryWithExternalId(undefined, walletContext);
            fail();
        }
        catch (err) {
            // pass
        }
    });
    it('Testing the constructor with empty string as external ID', () => {
        const walletContext = {
            dep: { dal: undefined },
            permissions: ['thing'],
            tenantId: '1',
        };
        try {
            const test = new balanceInquiryWithExternalId_1.BalanceInquiryWithExternalId('', walletContext);
            fail();
        }
        catch (err) {
            // pass
        }
    });
    it('Testing the constructor undefined Wallet Context', () => {
        const walletContext = undefined;
        try {
            const test = new balanceInquiryWithExternalId_1.BalanceInquiryWithExternalId('123', walletContext);
            fail();
        }
        catch (err) {
            // pass
        }
    });
});
