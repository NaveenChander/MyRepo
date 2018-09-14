"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
class ListBankAccountsRequest {
    constructor(sessionId, patronId, deviceId) {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === '') {
            throw errorCodes_1.ErrorCodes.invalidListCardsRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
    }
    send(token) {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
        };
        const headers = {};
        return requestWrapper_1.POST(config_1.config.rootPath + 'whatever', body, headers, true)
            .then((result) => {
            console.log(result);
            const formattedResult = undefined;
            return formattedResult;
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.ListBankAccountsRequest = ListBankAccountsRequest;
