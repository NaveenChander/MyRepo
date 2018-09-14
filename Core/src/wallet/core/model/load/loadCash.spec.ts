import { ErrorCodes } from '../codes/errorCodes';
import { WalletContext } from '../types/walletContext';
import {} from 'jasmine';
import { LoadCash } from './loadCash';
import { Load } from './load';

describe('core/model/load/loadCash', (() =>
 {
  it('Negative Value for the Amount', (() =>
   {
    let error: string;
    const walletContext: WalletContext = {
      dep: {dal: undefined },
      permissions: ['thing'],
      tenantId: '1',
      everiPatronId: '123',
    };
    try
    {
      const loadcash: Load = new LoadCash(
        1,
        '1',
        '1',
        'withdrawl',
        '3',
        -300,
        'cash',
        walletContext,
    );
    }
    catch (err)
    {
      error = err;
    }

    expect(error).toContain(ErrorCodes.invalidAmount);
  }));

  it('TenantID  is not defined properly', (() =>
  {
    let error: string;
    const walletContext: WalletContext = {
      dep: {dal: undefined },
      permissions: ['thing'],
      tenantId: '1',
      everiPatronId: '123',
    };
    try
    {
      const loadcash: Load = new LoadCash(
        null,
        '1',
        '1',
        'withdrawl',
        '3',
        300,
        'cash',
        walletContext,
      );
    }
    catch (err)
    {
      error = err;
    }
    expect(error).toContain(ErrorCodes.invalidTenantId);
  }));

  it('Unload Object Created Properly', (() =>
  {
    let error: string;
    const walletContext: WalletContext = {
      dep: {dal: undefined },
      permissions: ['thing'],
      tenantId: '1',
      everiPatronId: '123',
    };
    let loadcash: Load;
    try
    {
      loadcash = new LoadCash(
        1,
        '1',
        '1',
        'withdrawl',
        '3',
        300,
        'cash',
        walletContext,
      );
    }
    catch (err)
    {
       error = err;
    }
    expect(loadcash).not.toBeNull();
  }));

}));
