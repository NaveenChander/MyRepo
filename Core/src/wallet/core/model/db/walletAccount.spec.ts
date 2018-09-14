import {} from 'jasmine';
import { WalletAccount } from './walletAccount';

describe('core/model/walletAccount', () =>
{
    it('Testing the constructor happy case', () =>
    {
        const walletAccount: WalletAccount = new WalletAccount(
            1,
            12,
            '1',
            123,
            1234,
            '12');

        // will check param order changes, and the private access
        expect(walletAccount.patronWalletId).toBe(1);
        expect(walletAccount.accountId).toBe(12);
        expect(walletAccount.tenantId).toBe('1');
        expect(walletAccount.balance).toBe(123);
        expect(walletAccount.limit).toBe(1234);
        expect(walletAccount.externalAccountId).toBe('12');

        try
        {
            // @ts-ignore
            walletAccount.patronWalletId = 143223;
            fail('Should be readonly');
        }
        catch (err)
        {
            expect(walletAccount.patronWalletId).toBe(1);
        }
    });

    it('Testing an undefined case', () =>
    {
        try
        {
            const walletAccount: WalletAccount = new WalletAccount(
                undefined,
                12,
                '1',
                123,
                1234,
                '12');
                fail('Should have thrown an error');
        }
        catch (err)
        {
            // pass
        }
    });

    it('Testing an empty string case', () =>
    {
        try
        {
            const walletAccount: WalletAccount = new WalletAccount(
                1,
                12,
                '',
                123,
                1234,
                '12');
                fail('Should have thrown an error');
        }
        catch (err)
        {
            // pass
        }
    });

});
