"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const walletAccount_1 = require("../db/walletAccount");
const statusCodes_1 = require("../codes/statusCodes");
const errorCodes_1 = require("../codes/errorCodes");
class TransactionsCashResults {
    constructor(walletAccount, everiPatronId, transactionId) {
        if (walletAccount_1.WalletAccount === undefined
            || everiPatronId === ''
            || everiPatronId === undefined
            || transactionId === ''
            || transactionId === undefined) {
            throw [statusCodes_1.StatusCodes.BadRequest,
                errorCodes_1.ErrorCodes.invalidBalanceInquiryResultParameters];
        }
        this.WalletAccount = walletAccount;
        this.EveriPatronId = everiPatronId.trim();
        this.TransactionId = transactionId;
    }
    get walletAccount() { return this.WalletAccount; }
    get everiPatronId() { return this.EveriPatronId; }
    get transactionId() { return this.TransactionId; }
}
exports.TransactionsCashResults = TransactionsCashResults;
