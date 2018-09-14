import { StatusCodes as status } from '../../../../core/model/codes/statusCodes';
import { execute } from './adapterForLinkWallet';

import { } from 'jasmine';
import { ActionTypes } from '../../../../Core/model/actionTypes';

describe(`Adapter for Link Wallet`, async () =>
{
    const externalInterfaceDate = {
        Vendor_Name: 'scientificGames',
        Action_Type: ActionTypes.LinkWallet,
    };

    it(`Calling execute method with valid vendor and action`, async () =>
    {
        const result = await execute(externalInterfaceDate);
        expect(result[0]).toBe(status.OK);
    });

    it(`Calling execute method with unknown vendor`, async () =>
    {
        externalInterfaceDate.Vendor_Name = 'UnknownVendor';
        const result = await execute(externalInterfaceDate);
        expect(result[0]).toBe(status.InternalServerError);
    });

});
