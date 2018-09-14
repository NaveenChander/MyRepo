import {} from 'jasmine';
import { StatusCodes } from '../../model/codes/statusCodes';
import { canExecute } from './permissions';

describe('core/shared/permissions', () =>
{

    it('canExecute()- Missing all permissions will fail', () =>
    {
      canExecute(
        ['a'],
        ['b'],
        () => { fail('Allowed to execute when it shouldn\'nt have'); },
        () => { return; },
      );

    });

    it('canExecute()- All permissions will pass', () =>
    {
      canExecute(
        ['a', 'b'],
        ['b'],
        () => { return; },
        () => { fail('Allowed to execute when it shouldn\'nt have'); },
      );
    });

    it('canExecute()- Having a single permissions will pass', () =>
    {
      canExecute(
        ['a', 'b'],
        ['b', 'c'],
        () => { return; },
        () => { fail('Allowed to execute when it shouldn\'nt have'); },
      );
    });

});
