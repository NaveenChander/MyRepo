import { response, responsePromise } from '../../../core/model/types/response';
import { WalletContext } from '../../../core/model/types/walletContext';
import { StatusCodes } from '../../../core/model/codes/statusCodes';
import { ActionTypes } from '../../../core/model/actionTypes';
import { Common } from '../common';
import { CommonOutbound } from './commonOutbound';

export class ApiGateway
{

    private walletContext: WalletContext;
    private walletAccountId: number;

    constructor(walletContext: WalletContext,
                walletAccountId: number)
    {
        if (walletAccountId === undefined
            || walletContext === undefined)
        {
            const err: response = [ StatusCodes.BadRequest, { } ];
            throw err;
        }
        this.walletContext = walletContext;
        this.walletAccountId = walletAccountId;
    }

    public async linkWallet(): responsePromise
    {
        const service: Common = new CommonOutbound(
                    this.walletContext,
                    this.walletAccountId,
                    ActionTypes.LinkWallet);
        return await service.invoke();
    }

    public createPatron(): any
    {
        return null; // Placeholder
    }
}
