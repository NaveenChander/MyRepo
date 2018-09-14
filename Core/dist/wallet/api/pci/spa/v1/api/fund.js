"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
function wallet(ctx) {
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;
    return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Funding from Cards not implemented');
}
exports.wallet = wallet;
