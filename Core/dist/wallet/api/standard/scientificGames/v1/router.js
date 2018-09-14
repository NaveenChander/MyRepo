"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_js_1 = require("crypto-js");
const Router = require("koa-router");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const api = require("./api");
// @ts-ignore
const signature_1 = require("signature");
const knexDal_1 = require("../../../../core/dal/knexDal");
const signatureKnex_1 = require("../../../../core/shared/signatureDal/knex/signatureKnex");
const router = new Router({
    prefix: '/sg-api/v1/:tenantId',
});
exports.router = router;
// All routes will pass through here
router.all('/*', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    if (ctx.request.headers['x-evri-date'] === undefined) {
        console.log('No X-Evri-Date header');
        ctx.unauthorized();
        return;
    }
    let authHeader;
    try {
        authHeader =
            signature_1.server.parseAuthorization(ctx.request.headers.authorization);
    }
    catch (err) {
        ctx.badRequest('Invalid authorization header.');
        return;
    }
    if (ctx.params.tenantId !== authHeader.CredentialScope.Tenant) {
        console.log('Tenant ID mismatch');
        return ctx.unauthorized();
    }
    const signatureDal = new signatureKnex_1.KnexSignatureDAL(ctx.walletDBConnection);
    const signingInfo = yield signatureDal
        .lookupSignatureParams(authHeader.APIKey, ctx.params.tenantId);
    if (signingInfo[0] === 503) {
        return ctx.send(statusCodes_1.StatusCodes.ServiceUnavailable, 'Service Unavailable');
    }
    if (signingInfo[0] !== 200) {
        console.log(signingInfo[0]);
        return ctx.unauthorized();
    }
    const walletContext = {
        tenantId: ctx.params.tenantId,
        permissions: signingInfo[1].permissions,
        dep: {
            dal: new knexDal_1.KnexDAL(ctx.walletDBConnection),
        },
    };
    const headersMap = createHeadersMap(authHeader.SignedHeaders, ctx.request.headers);
    const queryMap = createQueryMap(ctx.request.query);
    ctx.walletContext = walletContext;
    const dep = { algo: [crypto_js_1.HmacSHA256, crypto_js_1.SHA256] };
    const reqData = signature_1.server.createRequestData(ctx.request.method, ctx.request.url.split('?')[0], authHeader.Algorithm, authHeader.CredentialScope.Tenant, ctx.request.body, authHeader.APIKey, 'sg-api', // already matched from path
    'v1', // ^ same
    'wallet', // fixed value
    queryMap, authHeader.SignedHeaders, headersMap, ctx.request.headers['x-evri-date'], // datetime includes HHMMSS
    authHeader.Signature);
    const validSignature = signature_1.server.validate(dep, reqData, signingInfo[1].secretKey);
    console.log('Signature validation was ' +
        (validSignature ? 'successful.' : 'not successful.'));
    /*
    if (!validSignature)
    {
        ctx.unauthorized();
        return;
    }
    */
    yield next();
}));
function createHeadersMap(signedHeaders, headers) {
    const map = new Map();
    for (const header of signedHeaders) {
        map.set(header, headers[header]);
    }
    return map;
}
function createQueryMap(query) {
    const map = new Map();
    for (const key in query) // tslint:disable-line: forin
     {
        map.set(key, query[key]);
    }
    return map;
}
// Balance Inquiry
router.post('/wallet', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const result = yield api.balanceInquiry(ctx);
    ctx.ok(result[1]);
}));
// load/unload
router.post('/notification/cmp/transactions', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const transcationType = ctx.request.body.TransactionType;
    let result;
    console.log(transcationType);
    if (transcationType.toLowerCase() === 'deposit') {
        result = yield api.load(ctx);
    }
    else if (transcationType.toLowerCase() === 'withdrawl') {
        result = yield api.unload(ctx);
    }
    else {
        ctx.notFound('Invalid Transaction type');
    }
    ctx.ok(result[1]);
}));
// 404
router.all('/*', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.notFound('Invalid Path');
}));
