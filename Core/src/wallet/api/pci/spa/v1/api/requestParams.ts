import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { AuthorizationToken } from '../../../../../core/model/authToken';
import { ErrorCodes } from '../../../../../core/model/codes/errorCodes';

export function createRequestParameters(tenantId: string, walletId: string, token: string): [ErrorCodes, AuthorizationToken]
{
    const tokenObj: any = JSON.parse(token);

    if (tenantId !== tokenObj.tenantId
        || walletId !== tokenObj.walletId)
    {
        return [ErrorCodes.invalidWalletAccountOrTenantIdMismatch, undefined];
    }

    try
    {
        const authToken: AuthorizationToken = new AuthorizationToken(
            tokenObj.tenantId,
            tokenObj.cmsAccountId,
            tokenObj.externalPlayerCardNumber,
            tokenObj.walletId);

        return [ErrorCodes.OK, authToken];
    }
    catch (err)
    {
        return [ErrorCodes.invalidAuthorizationTokenParams, undefined];
    }

}
