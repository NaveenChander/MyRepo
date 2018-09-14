"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function cors(ctx, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        ctx.set('Access-Control-Allow-Origin', '*');
        const accessHeaders = ctx.headers['access-control-request-headers'];
        if (accessHeaders) {
            ctx.set('Access-Control-Allow-Headers', accessHeaders);
        }
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, HEAD');
        // ctx.set('Access-Control-Expose-Headers', options.expose);
        // if(ctx.request.header['access-control-request-method'])
        //     return
        // lets preflight checks return
        if (ctx.request.method === 'OPTIONS') {
            ctx.status = 204;
            return;
        }
        yield next();
    });
}
exports.cors = cors;
