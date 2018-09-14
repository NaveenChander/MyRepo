import { ErrorCodes } from './codes/errorCodes';
import { StatusCodes } from './codes/statusCodes';
import { WalletAccount } from './db/walletAccount';

export class Patron
{
    private Walletid: string;
    private ExternalKey: string;
    private FirstName: string;
    private LastName: string;
    private Gender: string;
    private Dob: string;
    private Street: string;
    private City: string;
    private State: string;
    private Country: string;
    private Zip: string;
    private Email: string;
    private Phone: string;
    private Ssn: string;
    private Account: [any];

    constructor(
        walletid: string,
        externalKey: string,
        firstName: string,
        lastName: string,
        gender: string,
        dob: string,
        street: string,
        city: string,
        state: string,
        country: string,
        zip: string,
        email: string,
        phone: string,
        ssn: string,
        account: [any])
    {
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
            || account === undefined)
        {
            throw [StatusCodes.BadRequest,
                ErrorCodes.invalidWalletAccountParameters];
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

    get walletid(): string { return this.Walletid; }
    get externalKey(): string { return this.ExternalKey; }
    get firstName(): string { return this.FirstName; }
    get lastName(): string { return this.LastName; }
    get gender(): string { return this.Gender; }
    get dob(): string { return this.Dob; }
    get street(): string { return this.Street; }
    get city(): string { return this.City; }
    get state(): string { return this.State; }
    get country(): string { return this.Country; }
    get zip(): string { return this.Zip; }
    get email(): string { return this.Email; }
    get phone(): string { return this.Phone; }
    get ssn(): string { return this.Ssn; }
    get account(): [any] { return this.Account; }

}
