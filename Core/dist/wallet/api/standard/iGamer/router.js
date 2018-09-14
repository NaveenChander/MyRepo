"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router = require("koa-router");
const statusCodes_1 = require("../../../Core/Model/codes/statusCodes");
const api = require("./api/register");
const router = new Router({
    prefix: '/v1',
});
exports.router = router;
// middleware
router.all('/*', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.permissions = ['REGISTER'];
    const result = yield api.lookupiGamerSecretKey(ctx);
    if (result[0] === statusCodes_1.StatusCodes.OK
        && result[1].Secret_key === ctx.header.authorization.substr(6)) {
        yield next();
    }
    else if (result[0] === statusCodes_1.StatusCodes.BadRequest) {
        ctx.notFound(result);
    }
    else {
        ctx.notFound('Invalid Authorization');
    }
}));
// register
router.post('/register/', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield api.register(ctx);
}));
// 404
router.all('/*', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    console.log('catchall hit');
    ctx.notFound('Invalid Path');
}));
