"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function canExecute(permissions, requiredPermissions, success, fail) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const Satisifed = requiredPermissions.filter((requiredPermission) => permissions.includes(requiredPermission));
        if (Satisifed.length > 0) {
            return yield success();
        }
        else {
            return yield fail();
        }
    });
}
exports.canExecute = canExecute;
