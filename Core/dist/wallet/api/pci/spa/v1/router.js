"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router = require("koa-router");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const api = require("./api");
const router = new Router({
    prefix: '/pci-api/v1/:tenantId',
});
exports.router = router;
// middleware for all paths
router.all('/*', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield next();
}));
// retrieves a list of cards and bank info
router.get('/wallet/:walletid/paymentProviders', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Wallet Lookup? in the EVIPay Specifications Document
    yield api.paymentProvider.list(ctx);
}));
// add a card payment provider
router.post('/wallet/:walletid/paymentProviders/cards', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield api.paymentProvider.addCard(ctx);
}));
// add an ACH payment provider
router.post('/wallet/:walletid/paymentProviders/ECH', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Adding an ECH payment provider not implemented');
}));
// delete a payment provider by code
router.delete('/wallet/:walletid/paymentProviders/:providerid', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    console.log(ctx.params.providerid);
    api.paymentProvider.remove(ctx);
}));
// funding a wallet from providerId
router.post('/wallet/:walletid/paymentProviders/:providerid', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield api.fund.wallet(ctx);
}));
// catchall 404
router.all('/*', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.notFound('Invalid Path');
}));
