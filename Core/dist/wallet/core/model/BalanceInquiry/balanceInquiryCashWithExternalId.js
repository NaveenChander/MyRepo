"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../codes/statusCodes");
class BalanceInquiryCashWithExternalId {
    constructor(externalId, walletContext) {
        if (externalId === undefined
            || externalId === ''
            || walletContext === undefined) {
            const err = [statusCodes_1.StatusCodes.BadRequest, {}];
            throw err;
        }
        this.walletContext = walletContext;
        this.externalId = externalId;
    }
    lookup() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.walletContext.dep.dal.BalanceInquiryDal
                .BalanceInquiryWithExternalId(this.externalId, this.walletContext);
            if (result[0] !== statusCodes_1.StatusCodes.OK) {
                // handle error stuff
            }
            const balanceInquiryResults = result[1];
            return [statusCodes_1.StatusCodes.OK, balanceInquiryResults];
        });
    }
}
exports.BalanceInquiryCashWithExternalId = BalanceInquiryCashWithExternalId;
