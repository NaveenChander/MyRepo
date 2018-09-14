"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["Created"] = 201] = "Created";
    StatusCodes[StatusCodes["NoContent"] = 204] = "NoContent";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["Unauthorized"] = 401] = "Unauthorized";
    StatusCodes[StatusCodes["Forbidden"] = 403] = "Forbidden";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
    StatusCodes[StatusCodes["RequestTimeout"] = 408] = "RequestTimeout";
    StatusCodes[StatusCodes["Conflict"] = 409] = "Conflict";
    StatusCodes[StatusCodes["LengthRequired"] = 411] = "LengthRequired";
    StatusCodes[StatusCodes["InternalServerError"] = 500] = "InternalServerError";
    StatusCodes[StatusCodes["NotImplemented"] = 501] = "NotImplemented";
    StatusCodes[StatusCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    StatusCodes[StatusCodes["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
