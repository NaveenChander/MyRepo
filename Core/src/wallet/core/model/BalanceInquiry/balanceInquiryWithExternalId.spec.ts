import {} from 'jasmine';
import { WalletContext } from '../types/walletContext';
import { BalanceInquiryWithExternalId } from './balanceInquiryWithExternalId';
import * as Sinon from 'sinon';
import { response as responseType } from '../types/response';
import { StatusCodes } from '../codes/statusCodes';
import { TransactionTypes } from '../codes/transactionTypes';
import { WalletAccount } from '../db/walletAccount';

describe('core/model/balanceInquiryCashWithExternalId', () =>
{
    it('Testing the constructor happy case', () =>
    {
        const walletContext: WalletContext = {
            dep : {dal: undefined},
            permissions : ['thing'],
            tenantId : '1',
        };
        try
        {
            const test: BalanceInquiryWithExternalId =
                new BalanceInquiryWithExternalId('string', walletContext);
            // pass
        }
        catch (err)
        {
            fail(err);
        }

    });

    it('Testing the constructor with undefined external ID', () =>
    {
        const walletContext: WalletContext = {
            dep : {dal: undefined},
            permissions : ['thing'],
            tenantId : '1',
        };
        try
        {
            const test: BalanceInquiryWithExternalId =
                new BalanceInquiryWithExternalId(undefined, walletContext);
            fail();
        }
        catch (err)
        {
            // pass
        }
    });

    it('Testing the constructor with empty string as external ID', () =>
    {
        const walletContext: WalletContext = {
            dep : {dal: undefined},
            permissions : ['thing'],
            tenantId : '1',
        };
        try
        {
            const test: BalanceInquiryWithExternalId =
                new BalanceInquiryWithExternalId('', walletContext);
            fail();
        }
        catch (err)
        {
            // pass
        }
    });

    it('Testing the constructor undefined Wallet Context', () =>
    {
        const walletContext: WalletContext = undefined;
        try
        {
            const test: BalanceInquiryWithExternalId =
                new BalanceInquiryWithExternalId('123', walletContext);
            fail();
        }
        catch (err)
        {
            // pass
        }
    });

});
