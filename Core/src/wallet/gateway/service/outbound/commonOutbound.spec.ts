import { WalletContext } from '../../../../wallet/core/model/types/walletContext';
import { TransactionTypes } from '../../../../wallet/core/model/codes/transactionTypes';
import { StatusCodes as status } from '../../../../wallet/core/model/codes/statusCodes';
import { ActionTypes } from '../../../../wallet/core/model/actionTypes';
import * as test from '../../../../wallet/core/shared/testutil/contextHelper.spec';

import { CommonOutbound } from './commonOutbound';
import { } from 'jasmine';

const walletContext: WalletContext =
    test.getWalletContext([TransactionTypes.REGISTER]);
const walletAccountId: number = 1231548;
const actionType = ActionTypes.LinkWallet;
const service = new CommonOutbound(walletContext, walletAccountId, actionType);

describe(`Invoke Outbound Service`, async () =>
{
    it(`Constructor Happy Path`, async () =>
    {
        try
        {
            await new CommonOutbound(walletContext,
                walletAccountId, actionType);
            // pass
        }
        catch (error)
        {
            fail();
        }
    });

    it(`Constructor with undefined walletContext`, async () =>
    {
        try
        {
            await new CommonOutbound(undefined, walletAccountId, actionType);
            fail();
        }
        catch (error)
        {
            // pass
        }
    });

    it(`Constructor with undefined wallet id`, async () =>
    {
        try
        {
            await new CommonOutbound(walletContext, undefined, actionType);
            fail();
        }
        catch (error)
        {
            // pass
        }
    });

    it(`Call CommonOutbound`, async () =>
    {
        const result = await service.invoke();
        expect(result[0]).toBe(status.OK);
    });
});
