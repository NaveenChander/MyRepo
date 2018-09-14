import { StatusCodes } from '../../model/codes/statusCodes';
import { ErrorCodes } from '../../model/codes/ErrorCodes';
import { Patron } from '../../model/patron';

export interface NewWallet
{
    createNewWallet(): Promise<[StatusCodes, ErrorCodes | Patron]>;
}
