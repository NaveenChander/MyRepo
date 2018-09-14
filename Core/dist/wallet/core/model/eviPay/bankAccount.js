"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../codes/errorCodes");
class BankAccount {
    constructor(bankAccountId, bankRoutingNumber, bankAccountNumber, bankName, enrollmentDate) {
        if (bankAccountId === undefined
            || bankAccountId === ''
            || bankRoutingNumber === undefined
            || bankRoutingNumber === ''
            || bankAccountNumber === undefined
            || bankAccountNumber === ''
            || bankName === undefined
            || bankName === ''
            || enrollmentDate === undefined
            || enrollmentDate === '') {
            throw [errorCodes_1.ErrorCodes.needNewCode, {}];
        }
        this.BankAccountId = bankAccountId;
        this.BankRoutingNumber = bankRoutingNumber;
        this.BankAccountNumber = bankAccountNumber;
        this.BankName = bankName;
        this.EnrollmentDate = enrollmentDate;
    }
    get bankAccountId() { return this.BankAccountId; }
    get bankRoutingNumber() { return this.BankRoutingNumber; }
    get bankAccountNumber() { return this.BankAccountNumber; }
    get bankName() { return this.BankName; }
    get enrollmentDate() { return this.EnrollmentDate; }
}
exports.BankAccount = BankAccount;
