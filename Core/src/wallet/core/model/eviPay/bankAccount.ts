import { ErrorCodes } from '../codes/errorCodes';

export class BankAccount
{
    private BankAccountId: string;
    private BankRoutingNumber: string;
    private BankAccountNumber: string;
    private BankName: string;
    private EnrollmentDate: string;

    constructor(
        bankAccountId: string,
        bankRoutingNumber: string,
        bankAccountNumber: string,
        bankName: string,
        enrollmentDate: string)
    {
        if (bankAccountId === undefined
            || bankAccountId === ''
            || bankRoutingNumber === undefined
            || bankRoutingNumber === ''
            || bankAccountNumber === undefined
            || bankAccountNumber === ''
            || bankName === undefined
            || bankName === ''
            || enrollmentDate === undefined
            || enrollmentDate === '')
        {
            throw [ErrorCodes.needNewCode, {}];
        }

        this.BankAccountId = bankAccountId;
        this.BankRoutingNumber = bankRoutingNumber;
        this.BankAccountNumber = bankAccountNumber;
        this.BankName = bankName;
        this.EnrollmentDate = enrollmentDate;
    }

    get bankAccountId(): string { return this.BankAccountId; }
    get bankRoutingNumber(): string { return this.BankRoutingNumber; }
    get bankAccountNumber(): string { return this.BankAccountNumber; }
    get bankName(): string { return this.BankName; }
    get enrollmentDate(): string { return this.EnrollmentDate; }

}
