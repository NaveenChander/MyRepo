"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const walletAccount_1 = require("../../model/db/walletAccount");
const statusCodes_1 = require("../../model/codes/statusCodes");
const errorCodes_1 = require("../../model/codes/errorCodes");
const unloadCashResults_1 = require("../../model/unload/unloadCashResults");
const flakeId_1 = require("../../shared/idGenerator/flakeId");
class KnexUnloadDal {
    constructor(connectiondb) {
        if (connectiondb === undefined) {
            throw [statusCodes_1.StatusCodes.InternalServerError,
                errorCodes_1.ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connectiondb;
    }
    getPatronWallet(connectiondb, tenantId, externalpatronId, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let QueryResults;
            const promise = new Promise((resolve, reject) => {
                connectiondb('PatronWalletAccount')
                    .select('Balance', 'PatronWallet_ID', 'Account_ID', 'Limit')
                    .where({ Tenant_ID: tenantId, ExternalAccount_ID: externalpatronId })
                    .then((rows) => {
                    if (rows.length < 1) {
                        reject('Wallet Account not found');
                    }
                    if (amount > rows[0].Balance) {
                        reject('Not enough funds to download');
                    }
                    const result = {
                        walletId: rows[0].PatronWallet_ID,
                        Balance: rows[0].Balance,
                        accountId: rows[0].Account_ID,
                        limit: rows[0].Limit
                    };
                    resolve(result);
                }).catch((err) => {
                    return err;
                });
            });
            yield promise.then((obj) => {
                QueryResults = [statusCodes_1.StatusCodes.OK, obj];
            }).catch((err) => {
                QueryResults = [err.statusCode, err.message];
            });
            return QueryResults;
        });
    }
    unloadWallet(tenantId, externalpatronId, propertyCode, transcationType, operatorTranscationId, amount, fundingType, walletContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const walletResult = yield this.getPatronWallet(this.connection, tenantId, externalpatronId, amount);
            console.log(walletResult);
            const trasncationid = new flakeId_1.FlakeId({});
            let walletAccount;
            const transactionId = trasncationid.gen();
            const promise = new Promise((resolve, reject) => {
                if (walletResult[0] === statusCodes_1.StatusCodes.OK) {
                    const walletId = walletResult[1].walletId;
                    const balance = walletResult[1].Balance;
                    const transcations = {
                        Transaction: transactionId,
                        PatronWallet_ID: walletId,
                        SourceFundType: 'Cash',
                        SourceAmount: amount,
                        SourceSystem: 'EBS',
                        SourceAddress: 'SG',
                        SourceTerminal: 'SG',
                        DestintationFundType: 'Wallet',
                        DestinationAmount: balance - amount,
                        DestintationSystem: 'Wallet',
                        DestinationAddress: 'Everi',
                        DestinationTerminal: 'Everi',
                        OperationType: transcationType,
                        created_at: new Date().toLocaleString(),
                    };
                    this.connection.transaction((trx) => {
                        console.log('inside transcations');
                        trx('PatronWalletAccount')
                            .update({ Balance: balance - amount })
                            .where({ PatronWallet_ID: walletId })
                            .then(() => {
                            trx('Transaction')
                                .insert(transcations)
                                .then(() => {
                                trx.commit();
                                walletAccount = new walletAccount_1.WalletAccount(walletId, walletResult[1].accountId, tenantId.toString(), balance - amount, walletResult[1].limit, externalpatronId);
                                const trans = new unloadCashResults_1.TransactionsCashResults(walletAccount, '1', transactionId);
                                resolve(trans);
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                }
                else {
                    reject(walletResult[1]);
                }
            });
            let Queryresult;
            yield promise.then((trans) => {
                Queryresult = [statusCodes_1.StatusCodes.OK, trans];
            }).catch((err) => {
                Queryresult = [statusCodes_1.StatusCodes.NotFound, err];
            });
            return Queryresult;
        });
    }
}
exports.KnexUnloadDal = KnexUnloadDal;
