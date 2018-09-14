import { Unload } from './../../model/unload/unload';
import { StatusCodes } from '../../model/codes/statusCodes';
import { canExecute } from '../../shared/permissions/permissions';
import { WalletContext } from '../../model/types/walletContext';
import { response, responsePromise } from '../../model/types/response';
import { TransactionTypes } from '../../model/codes/transactionTypes';

export async function unloadCash(unloadcash: Unload, walletContext: WalletContext): responsePromise
{
       return await canExecute(
            walletContext.permissions,
            [ TransactionTypes.UNLOAD],
            () => unloadcash.unloadFromWallet(),
            () => [ StatusCodes.Forbidden, {}],
    );
}
