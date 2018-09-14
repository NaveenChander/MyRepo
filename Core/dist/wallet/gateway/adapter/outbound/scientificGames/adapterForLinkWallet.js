"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../../../core/model/codes/statusCodes");
const request = require("request-promise");
function execute(externalInterfaceData) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let requestObj = {};
        let externalResponse;
        const configJson = externalInterfaceData.Adapter_Config;
        if (configJson.content === 'body') {
            requestObj = {}; // TODO
        }
        externalResponse = yield callExternalService(requestObj, configJson);
        return externalResponse;
    });
}
exports.execute = execute;
function callExternalService(requestObj, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let externalResponse;
        const options = {
            url: config.baseURL + config.path,
            method: config.method,
            headers: constructHeader(config.headers),
            form: requestObj,
        };
        yield request(options).then((resp) => {
            externalResponse = resp;
        }).catch((err) => {
            console.log('Error', err);
            return [statusCodes_1.StatusCodes.InternalServerError, err];
        });
        return [statusCodes_1.StatusCodes.OK, externalResponse];
    });
}
function constructHeader(headers) {
    const obj = headers[0];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            obj[key] = mapHeaderValues(key, obj[key], headers);
        }
    }
    return headers;
}
function mapHeaderValues(headerKey, headerValue, headers) {
    switch (headerKey) {
        case 'X-Evri-Key':
            {
                return 'authkey';
            }
        case 'X-Everi-Date':
            {
                return '20180625T204307Z';
            }
        case 'X-Everi-SignedHeaders':
            {
                return mapSignedHeader(headers);
            }
        case 'authorization':
            {
                return 'authorization';
            }
    }
}
function mapSignedHeader(headers) {
    const obj = headers[0];
    let signedHeader = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            signedHeader = signedHeader + key + ';';
        }
    }
    return signedHeader;
}
