import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { createRequestParameters } from './requestParams';

export async function wallet(ctx: any)
{
    return ctx.send(StatusCodes.NotImplemented,
        'Funding Cards not implemented');
}
