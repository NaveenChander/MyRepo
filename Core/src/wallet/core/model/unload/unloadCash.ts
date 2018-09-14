import { ErrorCodes } from '../codes/errorCodes';
import { WalletContext } from '../types/walletContext';
import { StatusCodes } from '../codes/statusCodes';
import { unloadCashFromWalletDal } from '../../dal/unloadDal';
import {Unload} from './unload';
import { TransactionsCashResults } from './unloadCashResults';

export class UnloadCash implements Unload
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
        walletContext: WalletContext,
    )
    {
        let err: string;
        if (tenantId === null || tenantId === undefined )
       {
            err  = ErrorCodes.invalidTenantId;
            throw err;
        }

        if ( amount < 0)
        {
            err  = ErrorCodes.invalidAmount;
           throw err;

        }

        if (transactionType.toLocaleLowerCase() !== 'withdrawl'
         || transactionType === undefined)
        {
            err =  ErrorCodes.invalidTranscationType;
            throw err;
        }
        if (externalUserId === ''
        || externalUserId === undefined)
       {
           err =  ErrorCodes.invalidExternalpatronId;
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

    public async unloadFromWallet():
    Promise<[StatusCodes, TransactionsCashResults | ErrorCodes]>
    {
        const result: [StatusCodes, TransactionsCashResults | ErrorCodes ] =
        await this.walletContext.dep.dal.UnloadDal.unloadWallet(
            this.tenantId,
            this.externalUserId,
            this.propertyCode,
            this.transactionType,
            this.operationalTransactionId,
            this.amount,
            this.fundingType,
            this.walletContext);
            if (result[0] !== StatusCodes.OK)
            {
                // handle error stuff
            }

        return [StatusCodes.OK, result[1]];

    }

}
