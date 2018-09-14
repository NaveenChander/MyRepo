import { BalanceInquiry } from '../../model/BalanceInquiry/balanceInquiry';
import { response, responsePromise } from '../../model/types/response';
import { StatusCodes } from '../../model/codes/statusCodes';
import { WalletContext } from '../../model/types/walletContext';
import { canExecute } from '../../shared/Permissions/permissions';
import { TransactionTypes } from '../../model/codes/transactionTypes';

export async function balanceInquiry(
    balanceInquiryModel: BalanceInquiry,
    walletContext: WalletContext): responsePromise
    {
    return await canExecute(
        walletContext.permissions,
        [TransactionTypes.BALANCEINQUIRY, TransactionTypes.UNLOAD],
        () => balanceInquiryModel.lookup(),
        () => [ StatusCodes.Forbidden, {
            message : 'Lack Required Permissions',
        }],
    );
}
