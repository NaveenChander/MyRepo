"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../codes/errorCodes");
class CreditCard {
    constructor(Token, SessionId, DeviceId, PatronId, CardNumber, CardExpiry, CardHolderName, ZipCode, ConsentToSave, CVV) {
        if (Token === undefined || Token === ''
            || SessionId === undefined || SessionId === ''
            || DeviceId === undefined || DeviceId === ''
            || PatronId === undefined || PatronId === ''
            || CardNumber === undefined || CardNumber === ''
            || CardExpiry === undefined || CardExpiry === ''
            || CardHolderName === undefined || CardHolderName === ''
            || ZipCode === undefined || ZipCode === ''
            || ConsentToSave === undefined
            || ConsentToSave === ''
            || CVV === undefined || CVV === '') {
            throw [errorCodes_1.ErrorCodes.needNewCode, {}];
        }
        this.Token = Token;
        this.SessionId = SessionId;
        this.DeviceId = DeviceId;
        this.PatronId = PatronId;
        this.CardNumber = CardNumber;
        this.CardExpiry = CardExpiry;
        this.CardHolderName = CardHolderName;
        this.ZipCode = ZipCode;
        this.ConsentToSave = ConsentToSave;
        this.CVV = CVV;
    }
    get token() { return this.Token; }
    get sessionId() { return this.SessionId; }
    get deviceId() { return this.DeviceId; }
    get patronId() { return this.PatronId; }
    get cardNumber() { return this.CardNumber; }
    get cardExpiry() { return this.CardExpiry; }
    get cardHolderName() { return this.CardHolderName; }
    get zipCode() { return this.ZipCode; }
    get consentToSave() { return this.ConsentToSave; }
    get cvv() { return this.CVV; }
}
exports.CreditCard = CreditCard;
