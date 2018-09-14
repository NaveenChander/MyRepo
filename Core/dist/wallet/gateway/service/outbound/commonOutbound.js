"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const adapter = require("../../adapter/outbound/adapter");
const statusCodes_1 = require("../../../core/model/codes/statusCodes");
class CommonOutbound {
    constructor(walletContext, walletAccountId, actionType) {
        if (walletAccountId === undefined
            || walletContext === undefined
            || actionType === undefined) {
            const err = [statusCodes_1.StatusCodes.BadRequest, {}];
            throw err;
        }
        this.walletContext = walletContext;
        this.walletAccountId = walletAccountId;
        this.actionType = actionType;
    }
    invoke() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield adapter.route(this.walletContext, this.walletAccountId, this.actionType);
        });
    }
}
exports.CommonOutbound = CommonOutbound;
