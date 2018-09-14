import { StatusCodes } from '../../Model/codes/statusCodes';
import { WalletContext } from '../../model/types/walletContext';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { Patron } from '../../model/patron';
import { RegisterDalInterface } from './dal';
import { createErrorResponse } from '../../shared/knex/databaseErrors';

export class KnexRegisterDal implements RegisterDalInterface {
    private connection: any;

    constructor(connection: any)
    {
        if (connection === undefined)
        {
            throw [StatusCodes.InternalServerError,
                ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connection;
    }

    public async CreatePatronWallet(
        walletContext: WalletContext,
        patron: Patron):
        Promise<[StatusCodes, Patron | ErrorCodes]>
    {

        let results: [StatusCodes, Patron | ErrorCodes];
        const walletResult =
                    await this.LookupPatronWallet(walletContext);

        const promise = new Promise((resolve, reject) =>
        {
            if (walletResult[0] === StatusCodes.OK)
            {
                resolve(walletResult[1]);
            }
            else
            {
                this.connection.transaction((trx: any) =>
                {
                trx('PatronWallet')
                .insert({
                        Tenant_ID: walletContext.tenantId,
                        EveriPatron_ID : walletContext.everiPatronId,
                        ExternalWallet_ID : ''})
                .returning('*')
                .then((data: any) =>
                {
                    if (data)
                    {
                        console.log('Patron Wallet Created!!!');
                        resolve(this.CreatePatronWalletAccounts(
                                               walletContext, data, trx));
                    }
                    else
                    {
                        reject([StatusCodes.InternalServerError,
                            ErrorCodes.failedWalletCreation]);
                    }
                })
                .catch((error: any) =>
                {
                    const dbError = createErrorResponse(error);
                    reject(dbError);
                    trx.rollback(error);
                });
            })
            .then((obj: any) =>
            {
                console.log('Transaction Success');
            })
            .catch((error: any) =>
            {
                console.log('Rolling Back', error);
                reject(error);
            });
        }
    });

    await promise.then((walletAccounts: any) =>
    {
        const result: Patron = new Patron(
            walletAccounts[0].Wallet_ID,
            patron.externalKey,
            patron.firstName,
            patron.lastName,
            patron.gender,
            patron.dob,
            patron.street,
            patron.city,
            patron.state,
            patron.country,
            patron.zip,
            patron.email,
            patron.phone,
            patron.ssn,
            walletAccounts);

        results = [StatusCodes.OK, result];
    })
    .catch((error) =>
    {
        results = error;
    });

        return results;
    }

    public async CreatePatronWalletAccounts(
                        walletContext: any,
                        walletData: any,
                        trx: any): Promise<object>
    {
        let results: object;
        const accountResult: any =
                        await this.LookupPatronAccounts(walletContext);

        const promise = new Promise( (resolve, reject) =>
        {
            if (accountResult[0] === StatusCodes.OK)
            {
                const walletAccounts = [];
                const accountDetails = accountResult[1];
                for (const accountDetail of accountDetails)
                {
                    const temp = {
                        Account_ID : accountDetail.Account_ID,
                        Balance :  0,
                        ExternalAccount_ID : '',
                        Limit : 2000,
                        Wallet_ID : walletData[0].Wallet_ID,
                    };
                    walletAccounts.push(temp);
                }

                trx('WalletAccount')
                .insert(walletAccounts)
                .returning('*')
                .then((data: any) =>
                {
                    if (data)
                    {
                        console.log('Wallet Accounts Created!!!');
                        resolve(this.ConstructWalletAccountDetails
                            (accountDetails, data, trx));
                    }
                    else
                    {
                        console.log('Wallet Accounts Creation Failed!!!');
                        reject([StatusCodes.InternalServerError,
                            ErrorCodes.failedAccountCreation]);
                    }
                }).catch((error: any) =>
                {
                    reject(error);
                    trx.rollback(error);
                });
            }
            else
            {
                reject(walletData);
            }
        });

        await promise.then((obj) =>
        {
            results = obj;
            trx.commit();
        })
        .catch((err) =>
        {
            results = err;
            trx.rollback(err);
        });

        return results;

    }

    public async ConstructWalletAccountDetails(accounts: any,
                                                createdAccResults: any,
                                                trx: any): Promise<object>
    {
        let results: object;

        const promise = new Promise( (resolve, reject) =>
        {
            for (let i = 0; i < accounts.length; i++)
            {
                trx('Account')
                .select(
                    'Account.Account_ID',
                    'Account.AccountType_Code',
                    'Account.IsInternalAccount',
                    'AccountType.Category',
                    'AccountType.Description')
                .join('AccountType',
                    'Account.AccountType_Code', '=',
                    'AccountType.AccountType_Code')
                .where({
                    'Account.AccountType_Code': accounts[i].AccountType_Code,
                    'Account.Account_ID': accounts[i].Account_ID,
                    'Account.Tenant_ID': accounts[i].Tenant_ID})
                .then((data: any) =>
                {
                    if (data.length > 0)
                    {
                        createdAccResults[i].IsInternalAccount =
                            data[0].IsInternalAccount;
                        createdAccResults[i].Account_Name =
                            accounts[0].Account_Name;
                        createdAccResults[i].AccountType_Code =
                            data[0].AccountType_Code;
                        createdAccResults[i].Category = data[0].Category;
                        createdAccResults[i].Description = data[0].Description;
                        if (i === (accounts.length - 1))
                        {
                            resolve(createdAccResults);
                        }
                    }
                    else
                    {
                        reject('Mapping Failed');
                    }
                })
                .catch((error: any) =>
                {
                    reject(error);
                });
            }
        });

        await promise.then((obj) =>
        {
            results = obj;
        })
        .catch((err) =>
        {
            results = err;
        });

        return results;
    }

    public async LookupSecretKey(
                    walletContext: WalletContext):
                    Promise<[StatusCodes, object | ErrorCodes]>
    {
        let results: [StatusCodes, object | ErrorCodes];
        const promise = new Promise( (resolve, reject) =>
        {
            this.connection('tenant').distinct()
            .select('keystore.Secret_key')
            .join('keystore', 'tenant.tenant_id', '=', 'keystore.tenant_id')
            .where('tenant.tenant_id', walletContext.tenantId)
            .then((data: any) =>
            {
                if (data.length > 0)
                {
                    resolve(data);
                }
                else
                {
                    reject([StatusCodes.NotFound,
                        ErrorCodes.invalidSecretKeyOrTenantIdMismatch]);
                }
            })
            .catch((error: any) =>
            {
                const dbError = createErrorResponse(error);
                reject(dbError);
            });
        });

        await promise.then((obj: any) =>
        {
            results = [StatusCodes.OK, obj];
        })
        .catch((err) =>
        {
            results = err;
        });

        return results;
    }

    public async LookupPatronWallet(
                        walletContext: WalletContext):
                        Promise<[StatusCodes, object | ErrorCodes]>
    {
        let results: [StatusCodes, object | ErrorCodes];
        const promise = new Promise( (resolve, reject) =>
        {
            this.connection('PatronWallet')
            .select(
                'PatronWallet.Wallet_ID',
                'WalletAccount.Account_ID',
                'WalletAccount.Balance',
                'WalletAccount.Limit',
                'PatronWallet.EveriPatron_ID',
                'Account.Account_Name',
                'PatronWallet.Tenant_ID',
                'Account.AccountType_Code',
                'Account.IsInternalAccount',
                )
            .join('WalletAccount',
                'PatronWallet.Wallet_ID', '=', 'WalletAccount.Wallet_ID')
            .join('Account',
                'WalletAccount.Account_ID', '=', 'Account.Account_ID')
            .where({
                'PatronWallet.EveriPatron_ID' : walletContext.everiPatronId,
                'PatronWallet.Tenant_ID' : walletContext.tenantId})
            .then((data: any) =>
            {
                if (data.length > 0)
                {
                    console.log('Patron Wallet Found!!!');
                    resolve(data);
                }
                else
                {
                    console.log('Patron Wallet Not Found!!!');
                    reject([StatusCodes.NotFound,
                        ErrorCodes.invalidWalletWithIdMismatch]);
                }
            })
            .catch((error: any) =>
            {
                const dbError = createErrorResponse(error);
                reject(dbError);
            });
        });

        await promise.then((obj) =>
        {
            results = [StatusCodes.OK, obj];
        })
        .catch((err) =>
        {
            results = err;
        });

        return results;
    }

    public async LookupPatronAccounts(
                walletContext: WalletContext):
                Promise<[StatusCodes, object | ErrorCodes]>
    {

        let results: [StatusCodes, object | ErrorCodes];
        const promise = new Promise( (resolve, reject) =>
        {
            this.connection('Account')
            .select('*')
            .where({tenant_id : walletContext.tenantId})
            .then((accounts: any) =>
            {
                if (accounts.length > 0)
                {
                    console.log('Patron Accounts Found!!!');
                    resolve(accounts);
                }
                else
                {
                    console.log('No Patron Accounts Found!!!');
                    reject([StatusCodes.NotFound,
                        ErrorCodes.invalidAccountWithIdMismatch]);
                }
            })
            .catch((error: any) =>
            {
                const dbError = createErrorResponse(error);
                reject(dbError);
            });
        });

        await promise.then((obj) =>
        {
            results = [StatusCodes.OK, obj];
        })
        .catch((err) =>
        {
            results = err;
        });

        return results;
    }

    public async LookupAdapterConfig(
                walletContext: WalletContext,
                walletAccountID: any):
                Promise<[StatusCodes, object | ErrorCodes]>
    {

        let results: [StatusCodes, object | ErrorCodes];
        const promise = new Promise( (resolve, reject) =>
        {
            this.connection('Account').distinct()
            .select(
                    'Account.Account_ID',
                    'MAG.MA_GroupID',
                    'ExternalInterface.Vendor_Name',
                    'ExternalInterface.Adapter_Config',
                    'KeyStore.API_key',
                    'KeyStore.Secret_key')
            .join('AccountType',
                    'Account.AccountType_Code', '=',
                    'AccountType.AccountType_Code')
            .join('Corporate',
                    'Account.Tenant_ID', '=', 'Corporate.Tenant_ID')
            .join('Merchant',
                    'Corporate.Corporate_ID', '=', 'Merchant.Corporate_ID')
            .join('MerchantAccount_Group as MAG',
                {
                    'Merchant.Merchant_ID': 'MAG.Merchant_ID',
                    'Account.Account_ID' : 'MAG.Account_ID',
                })
            .leftJoin('ExternalInterface_Merchant_Map as EIMM',
                    'Merchant.Merchant_ID', '=', 'EIMM.Merchant_ID')
            .join('ExternalInterface',
                    'Account.Account_ID', '=', 'ExternalInterface.Account_ID')
            .join('KeyStore',
                {
                    'Account.Tenant_ID' : 'KeyStore.Tenant_ID',
                    'MAG.MA_GroupID' : 'KeyStore.MA_Group_ID',
                })
            .where({
                    'Account.Tenant_ID': walletContext.tenantId,
                    'Account.Account_ID': walletAccountID,
                })
            .then((data: any) =>
            {

                if (data.length > 0)
                {
                    resolve(data);
                }
                else
                {
                    reject([StatusCodes.NotFound,
                        ErrorCodes.invalidAdaptorWithIdMismatch]);
                }
            })
            .catch((error: any) =>
            {
                const dbError = createErrorResponse(error);
                reject(dbError);
            });
        });

        await promise.then((obj) =>
        {
            results = [StatusCodes.OK, obj];
        })
        .catch((err) =>
        {
            results = err;
        });

        return results;
    }

}
