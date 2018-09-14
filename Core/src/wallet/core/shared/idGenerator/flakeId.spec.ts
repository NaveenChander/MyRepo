import {} from 'jasmine';
import { FlakeId } from './flakeId';

describe('core/shared/idGenerator/flakeid', () =>
{

    it('Generate the ids and compare for uniqness', () =>
    {
        const flakeid: FlakeId = new FlakeId({});
        const transactionId1 = flakeid.gen();
        const transactionId2 = flakeid.gen();
        const  transactionId3 = flakeid.gen();
        expect(transactionId1).not.toEqual(transactionId2);
        expect(transactionId2).not.toEqual(transactionId3);

    });
});
