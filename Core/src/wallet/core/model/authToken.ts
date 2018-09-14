import { ErrorCodes } from '../model/codes/errorCodes';

export class AuthorizationToken
{
    private TenantId: string;
    private CMSAccountId: string;
    private ExternalPlayerCardNumber: string;
    private WalletId: string;

    constructor(
        TenantId: string,
        CMSAccountId: string,
        ExternalPlayerCardNumber: string,
        WalletId: string)
    {
        if (TenantId === ''
        || TenantId === undefined
        || CMSAccountId === ''
        || CMSAccountId === undefined
        || ExternalPlayerCardNumber === ''
        || ExternalPlayerCardNumber === undefined
        || WalletId === ''
        || WalletId === undefined)
        {
            throw [ErrorCodes.invalidAuthorizationTokenParams, {}];
        }
    }

    get tenantId() { return this.TenantId; }
    get cmsAccountId() { return this.CMSAccountId; }
    get externalPlayerCardNumber() { return this.ExternalPlayerCardNumber; }
    get walletId() { return this.WalletId; }
}
