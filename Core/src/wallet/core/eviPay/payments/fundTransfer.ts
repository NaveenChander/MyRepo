import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

export class FundTransferRequest
{
    private SessionId: string;
    private PatronId: string;
    private DeviceId: string;
    private MerchantId: string;
    private FromAccountId: string;
    private ToAccountId: string;
    private FundAmount: string;

    constructor(sessionId: string,
        patronId: string,
        deviceId: string,
        merchantId: string,
        fromAccountId: string,
        toAccountId: string,
        fundAmount: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === ''
            || merchantId === undefined
            || merchantId === ''
            || fromAccountId === undefined
            || fromAccountId === ''
            || toAccountId === undefined
            || toAccountId === ''
            || fundAmount === undefined
            || fundAmount === '')
        {
            throw ErrorCodes.invalidListCardsRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
        this.MerchantId = merchantId;
        this.FromAccountId = fromAccountId;
        this.ToAccountId = toAccountId;
        this.FundAmount = fundAmount;
    }

    public send(token: AuthorizationToken)
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            MerchantId: this.MerchantId,
            FromAccountId: this.FromAccountId,
            ToAccountId: this.ToAccountId,
            FundAmount: this.FundAmount,
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
