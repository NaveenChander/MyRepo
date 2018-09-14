"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
// no evi pay api?
class RemoveCardRequest {
    constructor(sessionId, deviceId, patronId, providerId) {
        if (sessionId === undefined
            || sessionId === ''
            || deviceId === undefined
            || deviceId === ''
            || patronId === undefined
            || patronId === ''
            || providerId === undefined
            || providerId === '') {
            throw errorCodes_1.ErrorCodes.invalidAddCardRequestParams;
        }
        this.SessionId = sessionId;
        this.DeviceId = deviceId;
        this.PatronId = patronId;
        this.ProviderId = providerId;
    }
    send(token) {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            CardNumber: this.ProviderId,
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
exports.RemoveCardRequest = RemoveCardRequest;
