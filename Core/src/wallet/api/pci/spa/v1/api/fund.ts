import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { createRequestParameters } from './requestParams';

export function wallet(ctx: any)
{
    const tenantId = ctx.params.tenantid;
    const walletId = ctx.params.walletid;

    return ctx.send(StatusCodes.NotImplemented,
        'Funding from Cards not implemented');
}
