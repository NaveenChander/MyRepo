import { response, responsePromise} from '../types/response';
import { StatusCodes } from '../codes/statusCodes';
import { WalletContext } from '../types/walletContext';
import { BalanceInquiry } from './balanceInquiry';
import { ErrorCodes } from '../codes/errorCodes';
import { WalletAccount } from '../db/walletAccount';

export class BalanceInquiryWithExternalId implements BalanceInquiry
{
    public externalId: string;
    public walletContext: WalletContext;

    constructor(externalId: string, walletContext: WalletContext)
    {
        if (externalId === undefined
            || externalId === ''
            || walletContext === undefined)
        {
            const err: response = [StatusCodes.BadRequest, {}];
            throw err;
        }
        this.walletContext = walletContext;
        this.externalId = externalId;
    }

    public async lookup()
        : Promise<[StatusCodes, WalletAccount | ErrorCodes]>
    {
        const result: [StatusCodes, WalletAccount | ErrorCodes] =
            await this.walletContext.dep.dal.BalanceInquiryDal
                .BalanceInquiryWithExternalId(
                    this.externalId,
                    this.walletContext);

        if (result[0] !== StatusCodes.OK)
        {
            if (result[0] === StatusCodes.NotFound)
            {
                return [StatusCodes.NotFound,
                    ErrorCodes.apiKeyNotFoundOrTenantIdMismatch];
            }

            if (result[0] === StatusCodes.RequestTimeout)
            {
                return [StatusCodes.RequestTimeout,
                    ErrorCodes.databaseTimeout];
            }

            if (result[0] === StatusCodes.ServiceUnavailable)
            {
                return [StatusCodes.ServiceUnavailable,
                    result[1]];
            }

            if (result[0] === StatusCodes.InternalServerError)
            {
                return [StatusCodes.InternalServerError,
                    ErrorCodes.unknown];
            }

            if (result[0] === StatusCodes.Conflict)
            {
                return [StatusCodes.Conflict, result[1]];
            }

            return result;
        }

        return [StatusCodes.OK, result[1]];
    }
}
