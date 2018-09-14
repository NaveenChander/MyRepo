"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flakeId_1 = require("./flakeId");
describe('core/shared/idGenerator/flakeid', () => {
    it('Generate the ids and compare for uniqness', () => {
        const flakeid = new flakeId_1.FlakeId({});
        const transactionId1 = flakeid.gen();
        const transactionId2 = flakeid.gen();
        const transactionId3 = flakeid.gen();
        expect(transactionId1).not.toEqual(transactionId2);
        expect(transactionId2).not.toEqual(transactionId3);
    });
});
