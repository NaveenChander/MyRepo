import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

export class AddCardRequest
{
    private SessionId: string;
    private DeviceId: string;
    private PatronId: string;
    private CardNumber: string;
    private CardExpiry: string;
    private CardHolderName: string;
    private ZipCode: string;
    private ConsentToSave: string;

    constructor(
    sessionId: string,
    deviceId: string,
    patronId: string,
    cardNumber: string,
    cardExpiry: string,
    cardHolderName: string,
    zipCode: string,
    consentToSave: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || deviceId === undefined
            || deviceId === ''
            || patronId === undefined
            || patronId === ''
            || cardNumber === undefined
            || cardNumber === ''
            || cardExpiry === undefined
            || cardExpiry === ''
            || cardHolderName === undefined
            || cardHolderName === ''
            || zipCode === undefined
            || zipCode === ''
            || consentToSave === undefined
            || consentToSave === ''
        )
        {
            throw ErrorCodes.invalidAddCardRequestParams;
        }

        this.SessionId = sessionId;
        this.DeviceId = deviceId;
        this.PatronId = patronId;
        this.CardNumber = cardNumber;
        this.CardExpiry = cardExpiry;
        this.CardHolderName = cardHolderName;
        this.ZipCode = zipCode;
        this.ConsentToSave = consentToSave;
    }

    public send(token: AuthorizationToken): Promise<any>
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            CardNumber: this.CardNumber,
            CardExpiry: this.CardExpiry,
            CardHolderName: this.CardHolderName,
            ZipCode: this.ZipCode,
            ConsentToSave: this.ConsentToSave,
        };
        const headers = {

        };

        return POST(
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
