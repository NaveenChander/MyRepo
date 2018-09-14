"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../core/model/codes/statusCodes");
const actionTypes_1 = require("../../../core/model/actionTypes");
const commonOutbound_1 = require("./commonOutbound");
class ApiGateway {
    constructor(walletContext, walletAccountId) {
        if (walletAccountId === undefined
            || walletContext === undefined) {
            const err = [statusCodes_1.StatusCodes.BadRequest, {}];
            throw err;
        }
        this.walletContext = walletContext;
        this.walletAccountId = walletAccountId;
    }
    linkWallet() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const service = new commonOutbound_1.CommonOutbound(this.walletContext, this.walletAccountId, actionTypes_1.ActionTypes.LinkWallet);
            return yield service.invoke();
        });
    }
    createPatron() {
        return null; // Placeholder
    }
}
exports.ApiGateway = ApiGateway;
