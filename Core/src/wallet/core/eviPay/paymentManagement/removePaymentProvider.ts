import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

// no evi pay api?
export class RemoveCardRequest
{
    private SessionId: string;
    private DeviceId: string;
    private PatronId: string;
    private ProviderId: string;

    constructor(
    sessionId: string,
    deviceId: string,
    patronId: string,
    providerId: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || deviceId === undefined
            || deviceId === ''
            || patronId === undefined
            || patronId === ''
            || providerId === undefined
            || providerId === '')
        {
            throw ErrorCodes.invalidAddCardRequestParams;
        }

        this.SessionId = sessionId;
        this.DeviceId = deviceId;
        this.PatronId = patronId;
        this.ProviderId = providerId;
    }

    public send(token: AuthorizationToken): Promise<any>
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            CardNumber: this.ProviderId,
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
