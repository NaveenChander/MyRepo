import { StatusCodes } from '../codes/statusCodes';
import { ErrorCodes } from '../codes/errorCodes';
import { TransactionsCashResults } from '../unload/unloadCashResults';

export interface Load {
    loadFromWallet():
    Promise<[StatusCodes, TransactionsCashResults | ErrorCodes]>;
}
