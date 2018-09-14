import { TransactionsCashResults } from './unloadCashResults';
import { StatusCodes } from '../codes/statusCodes';
import { ErrorCodes } from '../codes/errorCodes';

export interface Unload
{
    unloadFromWallet()
    : Promise<[StatusCodes, TransactionsCashResults | ErrorCodes]>;
}
