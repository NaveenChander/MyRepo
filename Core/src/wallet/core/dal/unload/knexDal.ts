import { WalletAccount } from '../../model/db/walletAccount';
import { StatusCodes } from '../../model/codes/statusCodes';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { UnloadDalInterface } from './dal';
import { WalletContext  } from '../../model/types/walletContext';
import { TransactionsCashResults } from '../../model/unload/unloadCashResults';
import { FlakeId } from '../../shared/idGenerator/flakeId';
import * as Knex from 'knex';

export class KnexUnloadDal implements UnloadDalInterface {
    private connection: Knex;

    constructor(
        connectiondb: Knex)
    {
        if (connectiondb === undefined)
        {
            throw [StatusCodes.InternalServerError,
                ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connectiondb;
    }

    public async  getPatronWallet(connectiondb: Knex,
        tenantId: number,
        externalpatronId: string,
        amount: number)
    : Promise<[StatusCodes, { walletId: number; Balance: number;
         accountId: number; limit: number }]>
    {
        let QueryResults: any;
        const promise = new Promise((resolve, reject) =>
        {
            connectiondb('PatronWalletAccount')
            .select('Balance', 'PatronWallet_ID', 'Account_ID', 'Limit')
            .where({Tenant_ID : tenantId, ExternalAccount_ID: externalpatronId})
            .then((rows: any) =>
            {
                if (rows.length < 1)
                {
                        reject ('Wallet Account not found');
                }
                if (amount > rows[0].Balance)
                {
                    reject ('Not enough funds to download');
                }
                const result: { walletId: string; Balance: string
                        accountId: number; limit: number} = {
                        walletId: rows[0].PatronWallet_ID,
                        Balance: rows[0].Balance,
                        accountId: rows[0].Account_ID,
                        limit: rows[0].Limit};
                resolve(result);
            }).catch((err) =>
            {
                return err;
            });
        });

        await promise.then((obj: { walletId: string; Balance: string,
            accountId: number; limit: number }) =>
        {
            QueryResults = [StatusCodes.OK, obj];
        }).catch((err: any) =>
        {
            QueryResults = [err.statusCode, err.message];
        });

        return QueryResults;
    }

    public async unloadWallet(tenantId: number,
        externalpatronId: string,
        propertyCode: string,
        transcationType: string,
        operatorTranscationId: string,
        amount: number,
        fundingType: string,
        walletContext: WalletContext)
        : Promise<[StatusCodes, TransactionsCashResults| ErrorCodes]>
    {
        const walletResult = await this.getPatronWallet(
            this.connection,
            tenantId,
            externalpatronId,
            amount);
        console.log(walletResult);
        const trasncationid: FlakeId = new FlakeId({});
        let walletAccount: WalletAccount;
        const transactionId = trasncationid.gen();
        const promise = new Promise((resolve, reject) =>
        {
            if (walletResult[0] === StatusCodes.OK)
            {
                const walletId: number = walletResult[1].walletId;
                const balance: number =  walletResult[1].Balance;
                const transcations =
                {
                    Transaction: transactionId,
                    PatronWallet_ID: walletId,
                    SourceFundType: 'Cash',
                    SourceAmount: amount,
                    SourceSystem: 'EBS',
                    SourceAddress: 'SG',
                    SourceTerminal: 'SG',
                    DestintationFundType: 'Wallet',
                    DestinationAmount:  balance - amount,
                    DestintationSystem: 'Wallet',
                    DestinationAddress: 'Everi',
                    DestinationTerminal: 'Everi',
                    OperationType: transcationType,
                    created_at:  new Date().toLocaleString(),
                };
                this.connection.transaction((trx: any) =>
                {
                    console.log('inside transcations');
                    trx('PatronWalletAccount')
                    .update({ Balance: balance - amount })
                    .where({ PatronWallet_ID: walletId })
                    .then(() =>
                    {
                        trx('Transaction')
                        .insert(transcations)
                        .then(() =>
                        {
                            trx.commit();
                            walletAccount = new WalletAccount(
                                walletId,
                                walletResult[1].accountId,
                                tenantId.toString(),
                                balance - amount,
                                walletResult[1].limit,
                                externalpatronId,
                            );

                            const trans: TransactionsCashResults =
                            new TransactionsCashResults(
                                walletAccount,
                                 '1',
                                 transactionId);

                            resolve(trans);
                        }).catch((err: any) =>
                        {
                            reject(err);
                        });
                    }).catch((err: any) =>
                    {
                        reject(err);
                    });
                  });
                }
                else
                {
                    reject(walletResult[1]);
                }
            });
            let Queryresult: [StatusCodes, TransactionsCashResults| ErrorCodes];
            await promise.then((trans: TransactionsCashResults) =>
            {
                Queryresult = [StatusCodes.OK, trans];
            }).catch((err) =>
            {
                Queryresult = [StatusCodes.NotFound, err];
            });
            return Queryresult;
        }
    }
