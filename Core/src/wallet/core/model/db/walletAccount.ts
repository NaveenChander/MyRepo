import { ErrorCodes } from '../codes/errorCodes';
import { StatusCodes } from '../codes/statusCodes';

export class WalletAccount {
    private PatronWalletId: number;
    private AccountId: number;
    private TenantId: string;
    private Balance: number;
    private Limit: number;
    private ExternalAccountId: string;

    constructor(
        patronWalletId: number,
        accountId: number,
        tenantId: string,
        balance: number,
        limit: number,
        externalAccountId: string)
    {
        if (patronWalletId === undefined
            || accountId === undefined
            || tenantId === ''
            || tenantId === undefined
            || balance === undefined
            || limit === undefined
            || externalAccountId === ''
            || externalAccountId === undefined)
        {
            throw [StatusCodes.Conflict,
                ErrorCodes.invalidWalletAccountParameters];
        }

        this.PatronWalletId = patronWalletId;
        this.AccountId = accountId;
        this.TenantId = tenantId;
        this.Balance = balance;
        this.Limit = limit;
        this.ExternalAccountId = externalAccountId.trim();
    }

    get patronWalletId(): number { return this.PatronWalletId; }
    get accountId(): number { return this.AccountId; }
    get tenantId(): string { return this.TenantId; }
    get balance(): number { return this.Balance; }
    get limit(): number { return this.Limit; }
    get externalAccountId(): string { return this.ExternalAccountId; }

}
