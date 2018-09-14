"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../../Model/codes/statusCodes");
const errorCodes_1 = require("../../model/codes/errorCodes");
const patron_1 = require("../../model/patron");
const databaseErrors_1 = require("../../shared/knex/databaseErrors");
class KnexRegisterDal {
    constructor(connection) {
        if (connection === undefined) {
            throw [statusCodes_1.StatusCodes.InternalServerError,
                errorCodes_1.ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connection;
    }
    CreatePatronWallet(walletContext, patron) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const walletResult = yield this.LookupPatronWallet(walletContext);
            const promise = new Promise((resolve, reject) => {
                if (walletResult[0] === statusCodes_1.StatusCodes.OK) {
                    resolve(walletResult[1]);
                }
                else {
                    this.connection.transaction((trx) => {
                        trx('PatronWallet')
                            .insert({
                            Tenant_ID: walletContext.tenantId,
                            EveriPatron_ID: walletContext.everiPatronId,
                            ExternalWallet_ID: ''
                        })
                            .returning('*')
                            .then((data) => {
                            if (data) {
                                console.log('Patron Wallet Created!!!');
                                resolve(this.CreatePatronWalletAccounts(walletContext, data, trx));
                            }
                            else {
                                reject([statusCodes_1.StatusCodes.InternalServerError,
                                    errorCodes_1.ErrorCodes.failedWalletCreation]);
                            }
                        })
                            .catch((error) => {
                            const dbError = databaseErrors_1.createErrorResponse(error);
                            reject(dbError);
                            trx.rollback(error);
                        });
                    })
                        .then((obj) => {
                        console.log('Transaction Success');
                    })
                        .catch((error) => {
                        console.log('Rolling Back', error);
                        reject(error);
                    });
                }
            });
            yield promise.then((walletAccounts) => {
                const result = new patron_1.Patron(walletAccounts[0].Wallet_ID, patron.externalKey, patron.firstName, patron.lastName, patron.gender, patron.dob, patron.street, patron.city, patron.state, patron.country, patron.zip, patron.email, patron.phone, patron.ssn, walletAccounts);
                results = [statusCodes_1.StatusCodes.OK, result];
            })
                .catch((error) => {
                results = error;
            });
            return results;
        });
    }
    CreatePatronWalletAccounts(walletContext, walletData, trx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const accountResult = yield this.LookupPatronAccounts(walletContext);
            const promise = new Promise((resolve, reject) => {
                if (accountResult[0] === statusCodes_1.StatusCodes.OK) {
                    const walletAccounts = [];
                    const accountDetails = accountResult[1];
                    for (const accountDetail of accountDetails) {
                        const temp = {
                            Account_ID: accountDetail.Account_ID,
                            Balance: 0,
                            ExternalAccount_ID: '',
                            Limit: 2000,
                            Wallet_ID: walletData[0].Wallet_ID,
                        };
                        walletAccounts.push(temp);
                    }
                    trx('WalletAccount')
                        .insert(walletAccounts)
                        .returning('*')
                        .then((data) => {
                        if (data) {
                            console.log('Wallet Accounts Created!!!');
                            resolve(this.ConstructWalletAccountDetails(accountDetails, data, trx));
                        }
                        else {
                            console.log('Wallet Accounts Creation Failed!!!');
                            reject([statusCodes_1.StatusCodes.InternalServerError,
                                errorCodes_1.ErrorCodes.failedAccountCreation]);
                        }
                    }).catch((error) => {
                        reject(error);
                        trx.rollback(error);
                    });
                }
                else {
                    reject(walletData);
                }
            });
            yield promise.then((obj) => {
                results = obj;
                trx.commit();
            })
                .catch((err) => {
                results = err;
                trx.rollback(err);
            });
            return results;
        });
    }
    ConstructWalletAccountDetails(accounts, createdAccResults, trx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const promise = new Promise((resolve, reject) => {
                for (let i = 0; i < accounts.length; i++) {
                    trx('Account')
                        .select('Account.Account_ID', 'Account.AccountType_Code', 'Account.IsInternalAccount', 'AccountType.Category', 'AccountType.Description')
                        .join('AccountType', 'Account.AccountType_Code', '=', 'AccountType.AccountType_Code')
                        .where({
                        'Account.AccountType_Code': accounts[i].AccountType_Code,
                        'Account.Account_ID': accounts[i].Account_ID,
                        'Account.Tenant_ID': accounts[i].Tenant_ID
                    })
                        .then((data) => {
                        if (data.length > 0) {
                            createdAccResults[i].IsInternalAccount =
                                data[0].IsInternalAccount;
                            createdAccResults[i].Account_Name =
                                accounts[0].Account_Name;
                            createdAccResults[i].AccountType_Code =
                                data[0].AccountType_Code;
                            createdAccResults[i].Category = data[0].Category;
                            createdAccResults[i].Description = data[0].Description;
                            if (i === (accounts.length - 1)) {
                                resolve(createdAccResults);
                            }
                        }
                        else {
                            reject('Mapping Failed');
                        }
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            });
            yield promise.then((obj) => {
                results = obj;
            })
                .catch((err) => {
                results = err;
            });
            return results;
        });
    }
    LookupSecretKey(walletContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const promise = new Promise((resolve, reject) => {
                this.connection('tenant').distinct()
                    .select('keystore.Secret_key')
                    .join('keystore', 'tenant.tenant_id', '=', 'keystore.tenant_id')
                    .where('tenant.tenant_id', walletContext.tenantId)
                    .then((data) => {
                    if (data.length > 0) {
                        resolve(data);
                    }
                    else {
                        reject([statusCodes_1.StatusCodes.NotFound,
                            errorCodes_1.ErrorCodes.invalidSecretKeyOrTenantIdMismatch]);
                    }
                })
                    .catch((error) => {
                    const dbError = databaseErrors_1.createErrorResponse(error);
                    reject(dbError);
                });
            });
            yield promise.then((obj) => {
                results = [statusCodes_1.StatusCodes.OK, obj];
            })
                .catch((err) => {
                results = err;
            });
            return results;
        });
    }
    LookupPatronWallet(walletContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const promise = new Promise((resolve, reject) => {
                this.connection('PatronWallet')
                    .select('PatronWallet.Wallet_ID', 'WalletAccount.Account_ID', 'WalletAccount.Balance', 'WalletAccount.Limit', 'PatronWallet.EveriPatron_ID', 'Account.Account_Name', 'PatronWallet.Tenant_ID', 'Account.AccountType_Code', 'Account.IsInternalAccount')
                    .join('WalletAccount', 'PatronWallet.Wallet_ID', '=', 'WalletAccount.Wallet_ID')
                    .join('Account', 'WalletAccount.Account_ID', '=', 'Account.Account_ID')
                    .where({
                    'PatronWallet.EveriPatron_ID': walletContext.everiPatronId,
                    'PatronWallet.Tenant_ID': walletContext.tenantId
                })
                    .then((data) => {
                    if (data.length > 0) {
                        console.log('Patron Wallet Found!!!');
                        resolve(data);
                    }
                    else {
                        console.log('Patron Wallet Not Found!!!');
                        reject([statusCodes_1.StatusCodes.NotFound,
                            errorCodes_1.ErrorCodes.invalidWalletWithIdMismatch]);
                    }
                })
                    .catch((error) => {
                    const dbError = databaseErrors_1.createErrorResponse(error);
                    reject(dbError);
                });
            });
            yield promise.then((obj) => {
                results = [statusCodes_1.StatusCodes.OK, obj];
            })
                .catch((err) => {
                results = err;
            });
            return results;
        });
    }
    LookupPatronAccounts(walletContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const promise = new Promise((resolve, reject) => {
                this.connection('Account')
                    .select('*')
                    .where({ tenant_id: walletContext.tenantId })
                    .then((accounts) => {
                    if (accounts.length > 0) {
                        console.log('Patron Accounts Found!!!');
                        resolve(accounts);
                    }
                    else {
                        console.log('No Patron Accounts Found!!!');
                        reject([statusCodes_1.StatusCodes.NotFound,
                            errorCodes_1.ErrorCodes.invalidAccountWithIdMismatch]);
                    }
                })
                    .catch((error) => {
                    const dbError = databaseErrors_1.createErrorResponse(error);
                    reject(dbError);
                });
            });
            yield promise.then((obj) => {
                results = [statusCodes_1.StatusCodes.OK, obj];
            })
                .catch((err) => {
                results = err;
            });
            return results;
        });
    }
    LookupAdapterConfig(walletContext, walletAccountID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let results;
            const promise = new Promise((resolve, reject) => {
                this.connection('Account').distinct()
                    .select('Account.Account_ID', 'MAG.MA_GroupID', 'ExternalInterface.Vendor_Name', 'ExternalInterface.Adapter_Config', 'KeyStore.API_key', 'KeyStore.Secret_key')
                    .join('AccountType', 'Account.AccountType_Code', '=', 'AccountType.AccountType_Code')
                    .join('Corporate', 'Account.Tenant_ID', '=', 'Corporate.Tenant_ID')
                    .join('Merchant', 'Corporate.Corporate_ID', '=', 'Merchant.Corporate_ID')
                    .join('MerchantAccount_Group as MAG', {
                    'Merchant.Merchant_ID': 'MAG.Merchant_ID',
                    'Account.Account_ID': 'MAG.Account_ID',
                })
                    .leftJoin('ExternalInterface_Merchant_Map as EIMM', 'Merchant.Merchant_ID', '=', 'EIMM.Merchant_ID')
                    .join('ExternalInterface', 'Account.Account_ID', '=', 'ExternalInterface.Account_ID')
                    .join('KeyStore', {
                    'Account.Tenant_ID': 'KeyStore.Tenant_ID',
                    'MAG.MA_GroupID': 'KeyStore.MA_Group_ID',
                })
                    .where({
                    'Account.Tenant_ID': walletContext.tenantId,
                    'Account.Account_ID': walletAccountID,
                })
                    .then((data) => {
                    if (data.length > 0) {
                        resolve(data);
                    }
                    else {
                        reject([statusCodes_1.StatusCodes.NotFound,
                            errorCodes_1.ErrorCodes.invalidAdaptorWithIdMismatch]);
                    }
                })
                    .catch((error) => {
                    const dbError = databaseErrors_1.createErrorResponse(error);
                    reject(dbError);
                });
            });
            yield promise.then((obj) => {
                results = [statusCodes_1.StatusCodes.OK, obj];
            })
                .catch((err) => {
                results = err;
            });
            return results;
        });
    }
}
exports.KnexRegisterDal = KnexRegisterDal;
