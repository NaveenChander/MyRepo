import { ErrorCodes } from '../../model/codes/errorCodes';
import { StatusCodes } from '../../model/codes/statusCodes';

export function createErrorResponse(err: any): [StatusCodes, ErrorCodes]
{
    const errMessage = err.message;

    const connectionFailed: string = 'Failed to connect to ';
    if (errMessage.substr(0, connectionFailed.length) === connectionFailed)
    {
        console.log('Failed to connect to DB');
        return [StatusCodes.ServiceUnavailable,
            ErrorCodes.databaseTimeout];
    }

    const loginFailed: string = 'Login failed for user ';
    if (err.message.substr(0, loginFailed.length) === loginFailed)
    {
        console.log('Invalid DB credentials');
        return [StatusCodes.ServiceUnavailable,
            ErrorCodes.invalidDatabaseCredentials];
    }

    return [StatusCodes.ServiceUnavailable,
        ErrorCodes.unknown];
}
