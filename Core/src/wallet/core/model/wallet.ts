import { Account } from './account';
import { Patron } from './patron';

export class Wallet
{
    public walletId: string;
    public patron: Patron;
    public account: Account;
}
