import { responsePromise } from '../../model/types/response';
import { StatusCodes } from '../../Model/codes/statusCodes';
import { canExecute } from '../../shared/permissions/permissions';
import { TransactionTypes } from '../../model/codes/transactionTypes';

export async function register(newWallet: any): responsePromise
{

    return await canExecute(
        newWallet.WalletContext.permissions,
        [TransactionTypes.REGISTER],
        () => newWallet.createNewWallet(),
        () => [ StatusCodes.Forbidden, {}],
    );

}
