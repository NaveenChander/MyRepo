"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const statusCodes_1 = require("../model/codes/statusCodes");
const flakeId_1 = require("../shared/idGenerator/flakeId");
function unloadCashFromWalletDal(tenantId, externalpatronId, propertyCode, transcationType, operatorTranscationId, amount, fundingType, walletDBcon) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const walletResult = yield getPatronWallet(walletDBcon, tenantId, externalpatronId, amount);
        let QueryResults;
        const trasncationid = new flakeId_1.FlakeId({});
        const promise = new Promise((resolve, reject) => {
            if (walletResult[0] === statusCodes_1.StatusCodes.OK) {
                const walletId = walletResult[1].walletId;
                const balance = walletResult[1].Balance;
                console.log(walletResult[1]);
                const transcations = {
                    Transaction_ID: trasncationid.gen(),
                    Wallet_ID: walletId,
                    SourceFundType: 'Cash',
                    SourceAmount: amount,
                    SourceSystem: 'EBS',
                    SourceAddress: 'SG',
                    DestintationFundType: 'Wallet',
                    DestinationAmount: balance,
                    DestintationSystem: 'Wallet',
                    DestinationAddress: 'Everi',
                    TransactionType: transcationType,
                };
                walletDBcon.transaction((trx) => {
                    trx('WalletAccount')
                        .update({ Balance: balance - amount })
                        .where({ Wallet_ID: walletId })
                        .then(() => {
                        trx('Transaction')
                            .insert(transcations)
                            .then(() => {
                            trx.commit();
                            const obj = {
                                Data: {
                                    transactionId: operatorTranscationId,
                                    CreatedOn: Date().toString(),
                                    Amount: {
                                        amount,
                                        currency: '$',
                                    },
                                    TransactionType: 'WithDrawl',
                                    Status: 2,
                                    Message: 'Withdarawl of ' + amount + ' is successfull',
                                    Success: true,
                                },
                            };
                            resolve(obj);
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                });
            }
            else {
                reject(walletResult[1]);
            }
        });
        yield promise
            .then((obj) => {
            QueryResults = [statusCodes_1.StatusCodes.OK, obj];
        })
            .catch((err) => {
            QueryResults = [statusCodes_1.StatusCodes.NotFound, err];
        });
        return QueryResults;
    });
}
exports.unloadCashFromWalletDal = unloadCashFromWalletDal;
function getPatronWallet(walletDBcon, tenantId, externalpatronId, amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let walletId;
        let QueryResults;
        let errorCode;
        const promise = new Promise((resolve, reject) => {
            walletDBcon('PatronWallet')
                .select('Wallet_ID')
                .where({ Tenant_ID: tenantId, EveriPatron_ID: externalpatronId })
                .then((result) => {
                if (result.length > 0) {
                    walletId = result[0].Wallet_ID;
                    walletDBcon('WalletAccount')
                        .select('Balance')
                        .where({ Wallet_ID: walletId })
                        .then((rows) => {
                        if (rows.length > 0) {
                            const balance = rows[0].Balance;
                            if (balance - amount > 0) {
                                const dbResult = {
                                    walletId,
                                    Balance: balance,
                                };
                                resolve(dbResult);
                            }
                            else {
                                errorCode = {
                                    statusCode: statusCodes_1.StatusCodes.Conflict,
                                    Message: 'Not enough Funds to download, The balance is' + balance,
                                };
                                reject(errorCode);
                            }
                        }
                    });
                }
                else {
                    errorCode = {
                        statusCode: statusCodes_1.StatusCodes.NotFound,
                        Message: 'Not able to find the wallet Account',
                    };
                    reject(errorCode);
                }
            })
                .catch((err) => {
                errorCode = {
                    statusCode: statusCodes_1.StatusCodes.InternalServerError,
                    Message: err,
                };
                reject(err);
            });
        });
        yield promise
            .then((obj) => {
            QueryResults = [statusCodes_1.StatusCodes.OK, obj];
        })
            .catch((err) => {
            QueryResults = [err.statusCode, err.message];
        });
        return QueryResults;
    });
}
