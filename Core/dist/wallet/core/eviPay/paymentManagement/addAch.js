"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
class AddACHRequest {
    constructor(sessionId, deviceId, patronId, routingNumber, accountNumber, consentToSave) {
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
            || consentToSave === '') {
            throw errorCodes_1.ErrorCodes.invalidAddACHRequestParams;
        }
        this.SessionId = sessionId;
        this.DeviceId = deviceId;
        this.PatronId = patronId;
        this.RoutingNumber = routingNumber;
        this.AccountNumber = accountNumber;
        this.ConsentToSave = consentToSave;
    }
    send(token) {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            RoutingNumber: this.RoutingNumber,
            AccountNumber: this.AccountNumber,
            ConsentToSave: this.ConsentToSave,
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
exports.AddACHRequest = AddACHRequest;
