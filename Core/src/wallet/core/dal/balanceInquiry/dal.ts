import { WalletContext } from '../../model/types/walletContext';
import { WalletAccount } from '../../model/db/walletAccount';
import { StatusCodes } from '../../model/codes/statusCodes';
import { ErrorCodes } from '../../model/codes/errorCodes';

export interface BalanceInquiryDalInterface {
    BalanceInquiryWithExternalId(
        externalId: string,
        walletContext: WalletContext)
            : Promise<[StatusCodes, WalletAccount | ErrorCodes]>;
}
