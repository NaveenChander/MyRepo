import { StatusCodes as status } from '../../model/codes/statusCodes';
import { TransactionTypes as Permission } from '../../model/codes/transactionTypes';
import { register } from './register';
import { getWallet } from '../../shared/testutil/contextHelper.spec';

import { } from 'jasmine';

describe('Register - Validate Permissions', async () =>
{
    // Check with valid permission
    it(`should return status code ${status.OK},
        if permission exists`, async () =>
        {
            const result =
                await register(getWallet(
                                            [Permission.REGISTER]));
            expect(result[0]).toBe(status.OK);
        });

    // Check with invalid permission
    it(`should return status code ${status.Forbidden},
        if permission doesn't exists`, async () =>
        {
            const result =
                await register(getWallet([Permission.LOAD]));
            expect(result[0]).toBe(status.Forbidden);
        });

    // Check with valid & multiple permissions
    it(`should return status code ${status.OK},
        if permission exists in array lists`, async () =>
        {
            const result =
                await register(getWallet(
                    [
                        Permission.REGISTER,
                        Permission.LOAD,
                    ],
                ));
            expect(result[0]).toBe(status.OK);
        });

    // Check with invalid & multiple permissions
    it(`should return status code ${status.Forbidden},
        if permission doesn't exists in array lists`, async () =>
        {
            const result =
                await register(getWallet(
                    [
                        Permission.UNLOAD,
                        Permission.LOAD,
                    ],
                ));
            expect(result[0]).toBe(status.Forbidden);
        });

    // Check without empty permissions
    it(`should return status code ${status.Forbidden},
        if permission list is empty`, async () =>
        {
            const result =
                await register(getWallet([]));
            expect(result[0]).toBe(status.Forbidden);
        });
});
