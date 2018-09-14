"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../../../core/model/codes/statusCodes");
function wallet(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return ctx.send(statusCodes_1.StatusCodes.NotImplemented, 'Funding Cards not implemented');
    });
}
exports.wallet = wallet;
