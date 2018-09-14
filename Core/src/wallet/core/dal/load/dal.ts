import { WalletContext } from '../../model/types/walletContext';
import { StatusCodes } from '../../model/codes/statusCodes';
import { TransactionsCashResults } from '../../model/unload/unloadCashResults';
import { ErrorCodes } from '../../model/codes/errorCodes';

export interface LoadDalInterface {
    loadWallet(
        tenantId: number,
        externalpatronId: string,
        propertyCode: string,
        transcationType: string,
        operatorTranscationId: string,
        amount: number,
        fundingType: string,
        WalletContext: WalletContext)
        : Promise<[StatusCodes, TransactionsCashResults| ErrorCodes]>;
}
