"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rp = require("request-promise");
function POST(uri, body, headers, isJson) {
    const options = {
        method: 'POST',
        uri,
        body,
        headers,
        json: isJson,
    };
    return rp(options);
}
exports.POST = POST;
function GET(uri, headers) {
    const options = {
        method: 'GET',
        uri,
        headers,
    };
    return rp(options);
}
exports.GET = GET;
function DELETE(uri, headers) {
    const options = {
        method: 'DELETE',
        uri,
        headers,
    };
    return rp(options);
}
exports.DELETE = DELETE;
