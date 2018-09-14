"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const respond = require("koa-respond");
const accessHandle_1 = require("../../../../middleware/cors/accessHandle");
const router_1 = require("./v1/router");
const app = new Koa();
const router = new Router();
const connection_1 = require("../../../db/connection");
app.use(respond())
    .use((ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            ctx.internalServerError(err.message);
            console.log(err);
        }
    }
}))
    .use((ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.walletDBConnection = connection_1.connection;
    yield next();
}))
    .use(accessHandle_1.cors)
    .use(bodyParser())
    .use(router.routes());
router.all('/spa/*', router_1.router.routes());
const port = process.env.PORT || 8003;
app.listen(port, () => {
    console.log('Listening on port ' + port + '!');
});
