"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
class LoadWalletFromBankRequest {
    constructor(sessionId, patronId, deviceId, merchantId, totalTransactionAmount, transactionAmount, transactionFee, bankAccountId, creditType) {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === ''
            || merchantId === undefined
            || merchantId === ''
            || totalTransactionAmount === undefined
            || totalTransactionAmount === ''
            || transactionAmount === undefined
            || transactionAmount === ''
            || transactionFee === undefined
            || transactionFee === ''
            || bankAccountId === undefined
            || bankAccountId === ''
            || creditType === undefined
            || creditType === '') {
            throw errorCodes_1.ErrorCodes.invalidLoadWalletRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
        this.MerchantId = merchantId;
        this.TotalTransactionAmount = totalTransactionAmount;
        this.TransactionAmount = transactionAmount;
        this.TransactionFee = transactionFee;
        this.BankAccountId = bankAccountId;
        this.CreditType = creditType;
    }
    send(token) {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            MerchantId: this.MerchantId,
            totalTransactionAmount: this.TotalTransactionAmount,
            transactionAmount: this.TransactionAmount,
            transactionFee: this.TransactionFee,
            bankAccountId: this.BankAccountId,
            creditType: this.CreditType,
        };
        const headers = {};
        requestWrapper_1.POST(config_1.config.rootPath + 'whatever', body, headers, true)
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
exports.LoadWalletFromBankRequest = LoadWalletFromBankRequest;
