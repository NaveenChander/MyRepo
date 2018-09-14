"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_1 = require("./permissions");
describe('core/shared/permissions', () => {
    it('canExecute()- Missing all permissions will fail', () => {
        permissions_1.canExecute(['a'], ['b'], () => { fail('Allowed to execute when it shouldn\'nt have'); }, () => { return; });
    });
    it('canExecute()- All permissions will pass', () => {
        permissions_1.canExecute(['a', 'b'], ['b'], () => { return; }, () => { fail('Allowed to execute when it shouldn\'nt have'); });
    });
    it('canExecute()- Having a single permissions will pass', () => {
        permissions_1.canExecute(['a', 'b'], ['b', 'c'], () => { return; }, () => { fail('Allowed to execute when it shouldn\'nt have'); });
    });
});
