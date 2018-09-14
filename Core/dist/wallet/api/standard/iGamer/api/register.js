"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const register_1 = require("../../../../Core/feature/Register/register");
const errorCodes_1 = require("../../../../core/model/codes/errorCodes");
const newWalletWithAccounts_1 = require("../../../../Core/Model/Register/newWalletWithAccounts");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const knexDal_1 = require("../../../../core/dal/knexDal");
const xmljson_1 = require("xmljson");
const toXml = require("jsontoxml");
function register(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const jsonBody = xmlToJson(ctx.request.rawBody);
        const patron = jsonBody;
        const walletContext = {
            tenantId: ctx.query.tenant_id,
            permissions: ctx.permissions,
            dep: { dal: new knexDal_1.KnexDAL(ctx.walletDBConnection) },
            everiPatronId: patron.Registration.externalKey,
        };
        const newWalletWithAccounts = new newWalletWithAccounts_1.NewWalletWithAccounts(walletContext, patron.Registration);
        const result = yield register_1.register(newWalletWithAccounts);
        switch (result[0]) {
            case statusCodes_1.StatusCodes.OK:
                {
                    ctx.response.body = jsonToXml(mapResponseData(result[1]));
                    break;
                }
            case statusCodes_1.StatusCodes.NotFound:
                {
                    ctx.notFound('Wallet Not Found');
                    break;
                }
            case statusCodes_1.StatusCodes.Forbidden:
                {
                    ctx.forbidden();
                    break;
                }
        }
    });
}
exports.register = register;
function lookupiGamerSecretKey(ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (ctx.query.tenant_id === null || ctx.query.tenant_id === undefined
            || ctx.query.tenant_id === '') {
            return [statusCodes_1.StatusCodes.BadRequest, errorCodes_1.ErrorCodes.invalidTenantId];
        }
        if (ctx.permissions === null || ctx.permissions === undefined) {
            return [statusCodes_1.StatusCodes.BadRequest, errorCodes_1.ErrorCodes.invalidPermission];
        }
        const walletContext = {
            tenantId: ctx.query.tenant_id,
            permissions: ctx.permissions,
            dep: { dal: new knexDal_1.KnexDAL(ctx.walletDBConnection) },
            everiPatronId: undefined,
        };
        return yield walletContext.dep.dal.RegisterDal.
            LookupSecretKey(walletContext);
    });
}
exports.lookupiGamerSecretKey = lookupiGamerSecretKey;
function mapResponseData(responseData) {
    for (const resData of responseData.Account) {
        if (resData.Account_Name === 'Everi  Cash') {
            const obj = {};
            obj.id = resData.Account_ID;
            obj.name = resData.Account_Name;
            obj.currency = 'USD';
            obj.balance = resData.Limit;
            responseData.Account = obj;
        }
    }
    return responseData;
}
function xmlToJson(xml) {
    let result;
    xmljson_1.to_json(xml, (error, json) => {
        if (error) {
            console.log('Conversion Error', error);
        }
        result = json;
    });
    return result;
}
function jsonToXml(json) {
    const xml = toXml({
        Wallet: json,
    });
    return xml;
}
