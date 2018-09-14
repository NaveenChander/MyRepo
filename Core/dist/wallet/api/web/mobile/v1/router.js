"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router = require("koa-router");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const api = require("./api");
const router = new Router({
    prefix: '/mobile/v1/:tenantId',
});
exports.router = router;
// ################### Every route passes through here ###################
router.all('/*', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Check everi token credentials
    yield next();
}));
// Registration for wallet
router.post('/patron', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    api.register.register(ctx);
    ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Registration for wallet not implemented');
}));
// Link mobile device to wallet
router.put('/patron', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    api.register.linkMobileDevice(ctx);
    ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Link Mobile Device not implemented');
}));
// Balance Inquiry
router.get('/wallet/:walletid', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    api.balanceInquiry.balanceInquiry(ctx);
    ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Balance Inquiry not implemented');
}));
// Transaction History
router.get('/wallet/:walletid/transactions', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Get Pending Staged Transactions in the EVIPay Specifications Document
    // Note: any query params would already be stripped off at
    // this point, access them with ctx.params
    api.transactionHistory.transactionHistory(ctx);
    console.log(ctx.params);
    ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Transaction History not implemented');
}));
// ################### Catchall 404 response ###################
router.all('/*', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.notFound('Invalid Path');
}));
