import { response, responsePromise } from '../../../core/model/types/response';
import { Common } from '../common';
import * as adapter from '../../adapter/outbound/adapter';
import { WalletContext } from '../../../core/model/types/walletContext';
import { StatusCodes } from '../../../core/model/codes/statusCodes';
import { ActionTypes } from '../../../core/model/actionTypes';

export class CommonOutbound implements Common {

    private walletContext: WalletContext;
    private walletAccountId: number;
    private actionType: ActionTypes;

    constructor(walletContext: WalletContext,
        walletAccountId: number, actionType: ActionTypes)
    {
        if (walletAccountId === undefined
            || walletContext === undefined
            || actionType === undefined)
        {
            const err: response = [ StatusCodes.BadRequest, { } ];
            throw err;
        }
        this.walletContext = walletContext;
        this.walletAccountId = walletAccountId;
        this.actionType = actionType;
    }

    public async invoke(): responsePromise
    {
        return await adapter.route(
                        this.walletContext,
                        this.walletAccountId,
                        this.actionType);
    }
}
