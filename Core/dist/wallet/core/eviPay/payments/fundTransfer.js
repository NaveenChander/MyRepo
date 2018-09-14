"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../../model/codes/errorCodes");
const requestWrapper_1 = require("../../shared/requestWrapper/requestWrapper");
const config_1 = require("../config/config");
class FundTransferRequest {
    constructor(sessionId, patronId, deviceId, merchantId, fromAccountId, toAccountId, fundAmount) {
        if (sessionId === undefined
            || sessionId === ''
            || patronId === undefined
            || patronId === ''
            || deviceId === undefined
            || deviceId === ''
            || merchantId === undefined
            || merchantId === ''
            || fromAccountId === undefined
            || fromAccountId === ''
            || toAccountId === undefined
            || toAccountId === ''
            || fundAmount === undefined
            || fundAmount === '') {
            throw errorCodes_1.ErrorCodes.invalidListCardsRequestParams;
        }
        this.SessionId = sessionId;
        this.PatronId = patronId;
        this.DeviceId = deviceId;
        this.MerchantId = merchantId;
        this.FromAccountId = fromAccountId;
        this.ToAccountId = toAccountId;
        this.FundAmount = fundAmount;
    }
    send(token) {
        const body = {
            Token: token,
            SessionId: this.SessionId,
            PatronId: this.PatronId,
            DeviceId: this.DeviceId,
            MerchantId: this.MerchantId,
            FromAccountId: this.FromAccountId,
            ToAccountId: this.ToAccountId,
            FundAmount: this.FundAmount,
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
exports.FundTransferRequest = FundTransferRequest;
