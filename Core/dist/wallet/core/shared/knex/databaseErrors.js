"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const statusCodes_1 = require("../../model/codes/statusCodes");
function createErrorResponse(err) {
    const errMessage = err.message;
    const connectionFailed = 'Failed to connect to ';
    if (errMessage.substr(0, connectionFailed.length) === connectionFailed) {
        console.log('Failed to connect to DB');
        return [statusCodes_1.StatusCodes.ServiceUnavailable,
            errorCodes_1.ErrorCodes.databaseTimeout];
    }
    const loginFailed = 'Login failed for user ';
    if (err.message.substr(0, loginFailed.length) === loginFailed) {
        console.log('Invalid DB credentials');
        return [statusCodes_1.StatusCodes.ServiceUnavailable,
            errorCodes_1.ErrorCodes.invalidDatabaseCredentials];
    }
    return [statusCodes_1.StatusCodes.ServiceUnavailable,
        errorCodes_1.ErrorCodes.unknown];
}
exports.createErrorResponse = createErrorResponse;
