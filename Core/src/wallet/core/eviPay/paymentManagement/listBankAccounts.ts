import { ErrorCodes } from '../../model/codes/errorCodes';
import { AuthorizationToken } from '../../model/authToken';
import { POST } from '../../shared/requestWrapper/requestWrapper';
import { config } from '../config/config';

export class ListBankAccountsRequest
{
    private SessionId: string;
    private PatronId: string;
    private DeviceId: string;

    constructor(sessionId: string,
        patronId: string,
        deviceId: string)
    {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === '')
        {
            throw ErrorCodes.invalidListCardsRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
    }

    public send(token: AuthorizationToken): Promise<any>
    {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
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
