"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This trim also includes a trim of inner consecutive characters, unlike
// the default trim which is called with string.trim(). ex: [a----b] => [a-b]
// where - represents ' '
function trimAll(str) {
    try {
        const result = str.trim()
            .replace(/\s+/g, ' ');
        return result;
    }
    catch (_a) {
        return '';
    }
}
exports.trimAll = trimAll;
