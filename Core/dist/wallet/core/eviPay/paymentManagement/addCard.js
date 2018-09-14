"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
class AddCardRequest {
    constructor(sessionId, deviceId, patronId, cardNumber, cardExpiry, cardHolderName, zipCode, consentToSave) {
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
            || consentToSave === '') {
            throw errorCodes_1.ErrorCodes.invalidAddCardRequestParams;
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
    send(token) {
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
exports.AddCardRequest = AddCardRequest;
