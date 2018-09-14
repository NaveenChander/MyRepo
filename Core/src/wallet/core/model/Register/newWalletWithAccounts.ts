import { StatusCodes } from '../../model/codes/statusCodes';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { Patron } from '../../model/patron';
import { response } from '../types/response';
import { WalletContext } from '../../model/types/walletContext';
import { NewWallet } from './newWallet';
import { ApiGateway } from '../../../gateway/service/outbound/apiGateway';

export class NewWalletWithAccounts implements NewWallet
{
    private WalletContext: WalletContext;
    private Patron: Patron;

    constructor(walletContext: WalletContext, patron: Patron)
    {
        if (walletContext === undefined
            || patron === undefined)
        {
            const err: response = [StatusCodes.InternalServerError, {}];
            throw err;
        }
        this.WalletContext = walletContext;
        this.Patron = patron;
    }

    public async createNewWallet():
                Promise<[StatusCodes, Patron | ErrorCodes]>
    {
        const result: [StatusCodes, Patron | ErrorCodes]  =
            await this.WalletContext.dep.dal.RegisterDal.CreatePatronWallet(
                this.WalletContext, this.Patron);

        const newWalletResults: any = result[1];

        if (result[0] === StatusCodes.OK)
        {

            const walletAccounts = newWalletResults.Account;

            for (const walletAccount of walletAccounts)
            {
                if (!walletAccount.IsInternalAccount)
                {
                    const apiGateway: ApiGateway = new ApiGateway(
                                                    this.WalletContext,
                                                    walletAccount.Account_ID);
                    const externalResponse = await apiGateway.linkWallet();
                }
            }
        }

        return [StatusCodes.OK, newWalletResults];
    }
}
