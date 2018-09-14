import { ErrorCodes } from '../codes/errorCodes';

export class CreditCard
{
    private Token: string;
    private SessionId: string;
    private DeviceId: string;
    private PatronId: string;
    private CardNumber: string;
    private CardExpiry: string;
    private CardHolderName: string;
    private ZipCode: string;
    private ConsentToSave: string;
    private CVV: string;

    constructor(
        Token: string,
        SessionId: string,
        DeviceId: string,
        PatronId: string,
        CardNumber: string,
        CardExpiry: string,
        CardHolderName: string,
        ZipCode: string,
        ConsentToSave: string,
        CVV: string)
    {
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
            || CVV === undefined || CVV === '')
        {
            throw [ErrorCodes.needNewCode, {}];
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

    get token(): string { return this.Token; }
    get sessionId(): string { return this.SessionId; }
    get deviceId(): string { return this.DeviceId; }
    get patronId(): string { return this.PatronId; }
    get cardNumber(): string { return this.CardNumber; }
    get cardExpiry(): string { return this.CardExpiry; }
    get cardHolderName(): string { return this.CardHolderName; }
    get zipCode(): string { return this.ZipCode; }
    get consentToSave(): string { return this.ConsentToSave; }
    get cvv(): string { return this.CVV; }

}
