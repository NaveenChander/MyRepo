"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
const addCard_1 = require("../../../../../core/eviPay/paymentManagement/addCard");
const addAch_1 = require("../../../../../core/eviPay/paymentManagement/addAch");
const listCards_1 = require("../../../../../core/eviPay/paymentManagement/listCards");
const removePaymentProvider_1 = require("../../../../../core/eviPay/paymentManagement/removePaymentProvider");
function list(ctx) {
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;
    const token = ctx.request.headers.AuthenticationToken;
    const sessionId = '';
    const patronId = '';
    const merchantId = '';
    const deviceId = '';
    const request = new listCards_1.ListCardsRequest(sessionId, patronId, merchantId, deviceId);
    request.send(token)
        .then((res) => {
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
    });
    return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Listing Cards and Bank Info not implemented');
}
exports.list = list;
function addCard(ctx) {
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;
    const token = ctx.request.headers.AuthenticationToken;
    const sessionId = '';
    const patronId = '';
    const deviceId = '';
    const request = new addCard_1.AddCardRequest(sessionId, deviceId, patronId, ctx.request.body.CardNumber, ctx.request.body.CardExpiry, ctx.request.body.CardHolderName, ctx.request.body.ZipCode, ctx.request.body.ConsentToSave);
    request.send(token)
        .then((res) => {
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
    });
    return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Adding a card not implemented');
}
exports.addCard = addCard;
function addAch(ctx) {
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;
    const token = ctx.request.headers.AuthenticationToken;
    const sessionId = '';
    const patronId = '';
    const deviceId = '';
    const request = new addAch_1.AddACHRequest(sessionId, deviceId, patronId, ctx.request.body.RoutingNumber, ctx.request.body.AccountNumber, ctx.request.body.ConsentToSave);
    request.send(token)
        .then((res) => {
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
    });
    return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Adding an ECH not implemented');
}
exports.addAch = addAch;
function remove(ctx) {
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;
    const providerId = ctx.params.providerid;
    const token = ctx.request.headers.AuthenticationToken;
    const sessionId = '';
    const patronId = '';
    const deviceId = '';
    const request = new removePaymentProvider_1.RemoveCardRequest(sessionId, deviceId, patronId, providerId);
    request.send(token)
        .then((res) => {
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
    });
    return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Deleting Cards and Bank Info not implemented');
}
exports.remove = remove;
