import { TransactionsCashResults } from './../../../../../core/model/unload/unloadCashResults';
import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { Load } from '../../../../../core/model/load/load';
import { LoadCash } from '../../../../../core/model/load/loadCash';
import { loadCash as coreloadCash } from '../../../../../core/feature/load/load';

export async function load(ctx: any)
{
    const tenantId = ctx.params.tenantId;
    const transcationtype: string = ctx.request.body.TransactionType;
    const operatorTranscationId: string =
    ctx.request.body.operatorTranscationId;
    const externalUserId: string  = ctx.request.query.userid;
    const amount: number = ctx.request.body.Amount;
    const fundingType = ctx.request.body.fundingType;
    const propertyCode  = ctx.request.body.propertyCode;
    let loadCash: Load;

    console.log(externalUserId);

    try
    {
        loadCash = new LoadCash(
            tenantId,
            externalUserId,
            propertyCode,
            transcationtype,
            operatorTranscationId,
            amount,
            fundingType,
            ctx.walletContext);
    }
    catch (err)
    {
        return [StatusCodes.BadRequest, {}];
    }
    const result: any  = await coreloadCash(loadCash, ctx.walletContext);

    const transResults: TransactionsCashResults = result[1];
    const sgResponse: {
        Data: {
            UserId: string,
            Balance: number,
            Currency: string,
            Amount: string,
            TransactionId: string,
        },
        Success: string,
        Errors: string [],
    } =
    {
        Data: {
            UserId: transResults.walletAccount.externalAccountId,
            Balance: transResults.walletAccount.balance,
            Currency: '$',
            Amount: this.amount,
            TransactionId: transResults.transactionId,
        },
        Success: 'true',
        Errors: [
            null,
        ],
    };
    return [StatusCodes.OK, sgResponse];
}
