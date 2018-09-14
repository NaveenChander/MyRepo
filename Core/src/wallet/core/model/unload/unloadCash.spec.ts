import { ErrorCodes } from '../codes/errorCodes';
import { WalletContext } from '../types/walletContext';
import {} from 'jasmine';
import { UnloadCash } from './unloadCash';
import { Unload } from './unload';

describe('core/model/unload/unloadCash', (() =>
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
      const unloadcash: Unload = new UnloadCash(
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
      const unloadcash: Unload = new UnloadCash(
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
    let unloadcash: Unload;
    try
    {
      unloadcash = new UnloadCash(
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
    expect(unloadcash).not.toBeNull();
  }));

}));
