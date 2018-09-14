import { StatusCodes } from '../../../core/model/codes/statusCodes';
import { TransactionTypes } from '../../../core/model/codes/transactionTypes';
import * as test from '../../../core/shared/testutil/contextHelper.spec';
import { ActionTypes } from '../../../Core/model/actionTypes';

import * as Adapter from './adapter';
const adapter = Adapter;

import { } from 'jasmine';

/** Test Data */
const newWalletContext = test.getWalletContext([TransactionTypes.REGISTER]);

describe(`Testing Adapter Route`, async () =>
{
    it(`Happy Path`, async () =>
    {
        try
        {
            await adapter.route(
                    newWalletContext,
                    123456,
                    ActionTypes.LinkWallet);
        }
        catch (error)
        {
            // pass
            fail();
        }
    });

    it(`Passing undefined walletContext`, async () =>
    {
        try
        {
            const result = await adapter.route(
                    undefined,
                    123456,
                    ActionTypes.LinkWallet);
            fail();
        }
        catch (error)
        {
            // pass
        }
    });

    it(`Passing undefined walletAccountID`, async () =>
    {
        try
        {
            await adapter.route(
                    newWalletContext,
                    undefined,
                    ActionTypes.LinkWallet);
            fail();
        }
        catch (error)
        {
            // pass
        }
    });
});
