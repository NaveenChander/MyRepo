import { NewWallet } from './newWallet';
import { StatusCodes as status } from '../../model/codes/statusCodes';
import { NewWalletWithAccounts } from './newWalletWithAccounts';
import { TransactionTypes as Permission } from '../../model/codes/transactionTypes';
import { Patron } from '../../model/patron';
import { getWalletContext } from '../../shared/testutil/contextHelper.spec';

import { } from 'jasmine';

/** Test Data */
const walletContext = getWalletContext([Permission.REGISTER]);
const patron = new Patron(
        '123456',
        'external243432',
        'everi',
        'wallet',
        'm',
        '27-08-1992',
        'Tidal park',
        'Chennai',
        'Tamilnadu',
        'India',
        '600052',
        'name@someothermail.com',
        '123456789',
        'ssnnumber01',
        [{}],

        );

const newPatronAcc: NewWallet =
    new NewWalletWithAccounts(walletContext, patron);

describe('New Wallet Accounts - Validate Constructor', async () =>
{
    it(`Happy path`, () =>
    {
        try
        {
            const res: any = new NewWalletWithAccounts(walletContext, patron);
            // pass
        }
        catch (err)
        {
            fail();
        }
    });

    it('Constructor with undefined walletContext reference', () =>
    {
        try
        {
            const res: any = new NewWalletWithAccounts(undefined, patron);
            fail('Should have failed');
        }
        catch (err)
        {
            // pass
        }
    });

    it('Constructor with undefined parameter', () =>
    {
        try
        {
            const res = new NewWalletWithAccounts(undefined, patron);
            fail();
        }
        catch (err)
        {
            // pass
        }
    });
});

describe('New Wallet Accounts - Patron registration', () =>
{
    // New account test case
    it(`should return status code ${status.OK}
        for new wallet information`, async () =>
        {
            const result = await newPatronAcc.createNewWallet();
            expect(result[0]).toBe(status.OK);
        });

    // Existing account test case
    it(`should return status code ${status.OK}
        for existing wallet information`, async () =>
        {
            const result = await newPatronAcc.createNewWallet();
            expect(result[0]).toBe(status.OK);
        });

});
