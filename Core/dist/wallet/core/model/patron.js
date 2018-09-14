"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("./codes/errorCodes");
const statusCodes_1 = require("./codes/statusCodes");
class Patron {
    constructor(walletid, externalKey, firstName, lastName, gender, dob, street, city, state, country, zip, email, phone, ssn, account) {
        if (walletid === ''
            || externalKey === ''
            || firstName === ''
            || lastName === ''
            || gender === ''
            || dob === ''
            || street === ''
            || city === ''
            || state === ''
            || country === ''
            || zip === ''
            || email === ''
            || phone === ''
            || ssn === ''
            || account === undefined) {
            throw [statusCodes_1.StatusCodes.BadRequest,
                errorCodes_1.ErrorCodes.invalidWalletAccountParameters];
        }
        this.Walletid = walletid;
        this.ExternalKey = externalKey;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Gender = gender;
        this.Dob = dob;
        this.Street = street;
        this.City = city;
        this.State = state;
        this.Country = country;
        this.Zip = zip;
        this.Email = email;
        this.Phone = phone;
        this.Ssn = ssn;
        this.Account = account;
    }
    get walletid() { return this.Walletid; }
    get externalKey() { return this.ExternalKey; }
    get firstName() { return this.FirstName; }
    get lastName() { return this.LastName; }
    get gender() { return this.Gender; }
    get dob() { return this.Dob; }
    get street() { return this.Street; }
    get city() { return this.City; }
    get state() { return this.State; }
    get country() { return this.Country; }
    get zip() { return this.Zip; }
    get email() { return this.Email; }
    get phone() { return this.Phone; }
    get ssn() { return this.Ssn; }
    get account() { return this.Account; }
}
exports.Patron = Patron;
