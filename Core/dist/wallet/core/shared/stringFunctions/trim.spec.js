"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trim_1 = require("./trim");
describe('core/shared/utility/trim', () => {
    it('trimAll() left trim', () => {
        const input = '   test';
        const result = trim_1.trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });
    it('trimAll() left and right trim', () => {
        const input = '   test          ';
        const result = trim_1.trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });
    it('trimAll() right trim', () => {
        const input = 'test          ';
        const result = trim_1.trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });
    it('trimAll() inner trim', () => {
        const input = 'a         test';
        const result = trim_1.trimAll(input);
        const expectedResult = 'a test';
        expect(result).toBe(expectedResult);
    });
});
