import { WalletContext } from '../types/walletContext';
import { StatusCodes } from '../codes/statusCodes';
import { unloadCashFromWalletDal } from '../../dal/unloadDal';
import {Load} from './load';
import * as knex from 'knex';
import { response } from '../types/response';
import { TransactionsCashResults } from '../unload/unloadCashResults';
import { ErrorCodes } from '../codes/errorCodes';

export class LoadCash implements Load
{
    public tenantId: number;
    public propertyCode: string;
    public transactionType: string;
    public operationalTransactionId: string;
    public externalUserId: string;
    public amount: number;
    public fundingType: string;
    public walletContext: WalletContext;

    constructor(
        tenantId: number,
        externalUserId: string,
        propertyCode: string,
        transactionType: string,
        operationalTransactionId: string,
        amount: number,
        fundingType: string,
        walletContext: WalletContext )
    {
        let err: string;
        if (tenantId === null || tenantId === undefined )
       {
            err  = ErrorCodes.invalidTenantId ;
            throw err;
        }

        if ( amount < 0)
        {
            err  =  ErrorCodes.invalidAmount;
           throw err;

        }

        if (transactionType.toLocaleLowerCase() !== 'deposit'
            || transactionType === undefined)
        {
            err  = ErrorCodes.invalidTenantId;
            throw err;
        }

        if (externalUserId === ''
        || externalUserId === undefined)
       {
           err = ErrorCodes.invalidExternalpatronId;
           throw err;
       }

        this.tenantId = tenantId;
        this.externalUserId = externalUserId;
        this.propertyCode = propertyCode;
        this.transactionType = transactionType;
        this.operationalTransactionId = operationalTransactionId;
        this.amount = amount;
        this.fundingType = fundingType;
        this.walletContext = walletContext;
    }

    public async loadFromWallet()
            : Promise<[StatusCodes, TransactionsCashResults | ErrorCodes]>
    {
        return await this.walletContext.dep.dal.LoadDal.loadWallet(
                        this.tenantId,
                        this.externalUserId,
                        this.propertyCode,
                        this.transactionType,
                        this.operationalTransactionId,
                        this.amount,
                        this.fundingType,
                        this.walletContext );

    }

}
