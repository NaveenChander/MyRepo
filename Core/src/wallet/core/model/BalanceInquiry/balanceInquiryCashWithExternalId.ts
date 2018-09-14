import { response, responsePromise} from '../types/response';
import { StatusCodes } from '../codes/statusCodes';
import { WalletContext } from '../types/walletContext';
import { BalanceInquiry } from './balanceInquiry';
import { ErrorCodes } from '../codes/errorCodes';

export class BalanceInquiryCashWithExternalId implements BalanceInquiry
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
    : Promise<[StatusCodes, any | ErrorCodes]>
    {
        const result: [StatusCodes, any | ErrorCodes] =
            await this.walletContext.dep.dal.BalanceInquiryDal
                .BalanceInquiryWithExternalId(
                    this.externalId,
                    this.walletContext);

        if (result[0] !== StatusCodes.OK)
        {
            // handle error stuff
        }

        const balanceInquiryResults: any | ErrorCodes =
            result[1];

        return [StatusCodes.OK, balanceInquiryResults];
    }
}
