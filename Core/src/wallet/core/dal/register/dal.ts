import { WalletContext } from '../../model/types/walletContext';
import { StatusCodes } from '../../model/codes/statusCodes';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { Patron } from '../../model/patron';

export interface RegisterDalInterface {

    CreatePatronWallet(
        walletContext: WalletContext,
        patron: Patron): Promise<[StatusCodes, Patron | ErrorCodes]>;

    LookupSecretKey(
        walletContext: WalletContext):
        Promise<[StatusCodes, object | ErrorCodes]>;

    LookupAdapterConfig(
            walletContext: WalletContext,
            walletAccountID: any):
            Promise<[StatusCodes, object | ErrorCodes]>;

}
