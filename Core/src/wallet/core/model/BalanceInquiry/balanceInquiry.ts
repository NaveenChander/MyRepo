import { StatusCodes } from '../codes/statusCodes';
import { ErrorCodes } from '../codes/errorCodes';
import { WalletAccount } from '../db/walletAccount';

export interface BalanceInquiry
{
    lookup(): Promise<[StatusCodes, ErrorCodes | WalletAccount]>;
}
