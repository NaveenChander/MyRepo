"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../core/model/codes/statusCodes");
const ErrorCodes_1 = require("../../../core/model/codes/ErrorCodes");
function route(walletContext, walletAccountID, actionType) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const adapterConfig = yield walletContext.dep.dal.RegisterDal.LookupAdapterConfig(walletContext, walletAccountID);
        if (adapterConfig[0] !== statusCodes_1.StatusCodes.OK) {
            const err = [statusCodes_1.StatusCodes.NotFound,
                ErrorCodes_1.ErrorCodes.invalidAdaptorWithIdMismatch];
            return err;
        }
        const externalInterfaceData = adapterConfig[1];
        for (const data of externalInterfaceData) {
            const vendor = data.Vendor_Name;
            const action = actionType;
            let adapter;
            try {
                adapter = yield Promise.resolve().then(() => require(`./${vendor}/adapterFor${action}`));
            }
            catch (err) {
                throw err;
            }
            return yield adapter.execute(data);
        }
    });
}
exports.route = route;
