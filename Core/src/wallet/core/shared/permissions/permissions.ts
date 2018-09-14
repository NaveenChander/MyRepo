import { response, responsePromise } from '../../model/types/response';
import { StatusCodes } from '../../model/codes/statusCodes';

export async function canExecute(
        permissions: string[],
        requiredPermissions: string[],
        success: (...args: any[]) => any,
        fail: (...args: any[]) => any): responsePromise
    {
    const Satisifed =  requiredPermissions.filter(
    (requiredPermission: string) => permissions.includes(requiredPermission));

    if (Satisifed.length > 0)
    {
        return await success();
    }
    else
    {
        return await fail();
    }
}
