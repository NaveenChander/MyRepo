import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

export class AddACHRequest
{
    private SessionId: string;
    private DeviceId: string;
    private PatronId: string;
    private RoutingNumber: string;
    private AccountNumber: string;
    private ConsentToSave: string;

    constructor(
    sessionId: string,
    deviceId: string,
    patronId: string,
    routingNumber: string,
    accountNumber: string,
    consentToSave: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || deviceId === undefined
            || deviceId === ''
            || patronId === undefined
            || patronId === ''
            || routingNumber === undefined
            || routingNumber === ''
            || accountNumber === undefined
            || accountNumber === ''
            || consentToSave === undefined
            || consentToSave === ''
        )
        {
            throw ErrorCodes.invalidAddACHRequestParams;
        }

        this.SessionId = sessionId;
        this.DeviceId = deviceId;
        this.PatronId = patronId;
        this.RoutingNumber = routingNumber;
        this.AccountNumber = accountNumber;
        this.ConsentToSave = consentToSave;
    }

    public send(token: AuthorizationToken): Promise<any>
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            RoutingNumber: this.RoutingNumber,
            AccountNumber: this.AccountNumber,
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
