import { UnloadCash } from './../../model/unload/unloadCash';
import { StatusCodes } from '../../model/codes/statusCodes';
import { canExecute } from '../../shared/Permissions/permissions';
import { WalletContext } from '../../model/types/walletContext';
import { response, responsePromise } from '../../model/types/response';
import { LoadCash } from '../../model/load/loadCash';
import { TransactionTypes } from '../../model/codes/transactionTypes';
import { Load } from '../../model/load/load';

export async function loadCash(loadcash: Load, walletContext: WalletContext): responsePromise
{
       return await canExecute(
           walletContext.permissions,
           [TransactionTypes.LOAD],
           () => loadcash.loadFromWallet(),
           () => [ StatusCodes.Forbidden, {}],
    );
}
