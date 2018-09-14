"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router = require("koa-router");
const router = new Router({
    prefix: '/spa/*',
});
exports.router = router;
// middleware for all paths
router.all('/*', (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    yield next();
}));
// catchall 404
router.all('/*', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.notFound('Invalid Path');
}));
