import {} from 'jasmine';
import { trimAll } from './trim';

describe('core/shared/utility/trim', () =>
{

    it('trimAll() left trim', () =>
    {
        const input = '   test';
        const result = trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });

    it('trimAll() left and right trim', () =>
    {
        const input = '   test          ';
        const result = trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });

    it('trimAll() right trim', () =>
    {
        const input = 'test          ';
        const result = trimAll(input);
        const expectedResult = 'test';
        expect(result).toBe(expectedResult);
    });

    it('trimAll() inner trim', () =>
    {
        const input = 'a         test';
        const result = trimAll(input);
        const expectedResult = 'a test';
        expect(result).toBe(expectedResult);
    });

});
