"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../codes/statusCodes");
const errorCodes_1 = require("../codes/errorCodes");
class BalanceInquiryWithExternalId {
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
                if (result[0] === statusCodes_1.StatusCodes.NotFound) {
                    return [statusCodes_1.StatusCodes.NotFound,
                        errorCodes_1.ErrorCodes.apiKeyNotFoundOrTenantIdMismatch];
                }
                if (result[0] === statusCodes_1.StatusCodes.RequestTimeout) {
                    return [statusCodes_1.StatusCodes.RequestTimeout,
                        errorCodes_1.ErrorCodes.databaseTimeout];
                }
                if (result[0] === statusCodes_1.StatusCodes.ServiceUnavailable) {
                    return [statusCodes_1.StatusCodes.ServiceUnavailable,
                        result[1]];
                }
                if (result[0] === statusCodes_1.StatusCodes.InternalServerError) {
                    return [statusCodes_1.StatusCodes.InternalServerError,
                        errorCodes_1.ErrorCodes.unknown];
                }
                if (result[0] === statusCodes_1.StatusCodes.Conflict) {
                    return [statusCodes_1.StatusCodes.Conflict, result[1]];
                }
                return result;
            }
            return [statusCodes_1.StatusCodes.OK, result[1]];
        });
    }
}
exports.BalanceInquiryWithExternalId = BalanceInquiryWithExternalId;
