import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

export class LoadWalletFromBankRequest
{
    private SessionId: string;
    private PatronId: string;
    private DeviceId: string;
    private MerchantId: string;
    private TotalTransactionAmount: string;
    private TransactionAmount: string;
    private TransactionFee: string;
    private BankAccountId: string;
    private CreditType: string;

    constructor(sessionId: string,
        patronId: string,
        deviceId: string,
        merchantId: string,
        totalTransactionAmount: string,
        transactionAmount: string,
        transactionFee: string,
        bankAccountId: string,
        creditType: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === ''
            || merchantId === undefined
            || merchantId === ''
            || totalTransactionAmount === undefined
            || totalTransactionAmount === ''
            || transactionAmount === undefined
            || transactionAmount === ''
            || transactionFee === undefined
            || transactionFee === ''
            || bankAccountId === undefined
            || bankAccountId === ''
            || creditType === undefined
            || creditType === '')
        {
            throw ErrorCodes.invalidLoadWalletRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
        this.MerchantId = merchantId;
        this.TotalTransactionAmount = totalTransactionAmount;
        this.TransactionAmount = transactionAmount;
        this.TransactionFee = transactionFee;
        this.BankAccountId = bankAccountId;
        this.CreditType = creditType;
    }

    public send(token: AuthorizationToken)
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            MerchantId: this.MerchantId,
            totalTransactionAmount: this.TotalTransactionAmount,
            transactionAmount: this.TransactionAmount,
            transactionFee: this.TransactionFee,
            bankAccountId: this.BankAccountId,
            creditType: this.CreditType,
        };
        const headers = {

        };

        POST(
            config.rootPath + 'whatever',
            body,
            headers,
            true)
        .then((result: any) =>
        {
            console.log(result);
            const formattedResult: any = undefined;
            return formattedResult;
        })
        .catch((err: any) =>
        {
            console.log(err);
        });

    }

}
