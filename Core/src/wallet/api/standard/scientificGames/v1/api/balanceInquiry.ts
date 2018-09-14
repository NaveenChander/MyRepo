import { balanceInquiry as coreBalanceInquiry } from '../../../../../Core/feature/BalanceInquiry/balanceInquiry';
import { BalanceInquiryWithExternalId } from '../../../../../core/model/balanceInquiry/balanceInquiryWithExternalId';
import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { BalanceInquiry } from '../../../../../Core/model/BalanceInquiry/balanceInquiry';
import { ErrorCodes } from '../../../../../core/model/codes/errorCodes';
import { WalletAccount } from '../../../../../core/model/db/walletAccount';

export async function balanceInquiry(ctx: any)
{
    let result: [StatusCodes, WalletAccount];
    const userId = ctx.request.query.userid;

    let balanceInquiryCashWithExternalId: BalanceInquiry;
    try
    {
        balanceInquiryCashWithExternalId =
            new BalanceInquiryWithExternalId(userId, ctx.walletContext);
    }
    catch (err)
    {
        return [StatusCodes.BadRequest, {}];
    }

    result = await coreBalanceInquiry(
        balanceInquiryCashWithExternalId,
        ctx.walletContext);

    let sgResponse: {
            Data: {
                UserId: string,
                Balance: number,
                Currency: string,
                UserBonuses: string[],
            },
            Success: string,
            Errors: string [],
    };

    if (result[0] !== StatusCodes.OK)
    {
        sgResponse = {
            Data: undefined,
            Success: 'false',
            Errors: [
                result.toString(),
            ],
        };
        return [StatusCodes.OK, sgResponse];
    }

    const biResults: WalletAccount = result[1];
    sgResponse = {
        Data: {
            UserId: biResults.externalAccountId,
            Balance: biResults.balance,
            Currency: 'USD',
            UserBonuses: null,
        },
        Success: 'true',
        Errors: [
            null,
        ],
    };

    return [StatusCodes.OK, sgResponse];
}
