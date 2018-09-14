import { WalletAccount } from '../db/walletAccount';
import { StatusCodes } from '../codes/statusCodes';
import { ErrorCodes } from '../codes/errorCodes';

export class TransactionsCashResults {
    private WalletAccount: WalletAccount;
    private EveriPatronId: string;
    private TransactionId: string;

    constructor(
        walletAccount: WalletAccount,
        everiPatronId: string,
        transactionId: string)
    {
        if (WalletAccount === undefined
            || everiPatronId === ''
            || everiPatronId === undefined
            || transactionId === ''
            || transactionId === undefined)
        {
            throw [StatusCodes.BadRequest,
                ErrorCodes.invalidBalanceInquiryResultParameters];
        }
        this.WalletAccount = walletAccount;
        this.EveriPatronId = everiPatronId.trim();
        this.TransactionId = transactionId;
    }

    get walletAccount(): WalletAccount { return this.WalletAccount; }
    get everiPatronId(): string { return this.EveriPatronId; }
    get transactionId(): string { return this.TransactionId; }

}
