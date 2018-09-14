import * as Router from 'koa-router';
import { StatusCodes } from '../../../Core/Model/codes/statusCodes';
import * as api from './api/register';
import { response } from '../../../core/model/types/response';

const router = new Router({
    prefix: '/v1',
});

// middleware
router.all('/*', async (ctx: any, next: any) =>
{

    ctx.permissions = ['REGISTER'];
    const result: response =
    await api.lookupiGamerSecretKey(ctx);

    if (result[0] === StatusCodes.OK
        && result[1].Secret_key === ctx.header.authorization.substr(6))
    {
        await next();
    }
    else if (result[0] === StatusCodes.BadRequest)
    {
        ctx.notFound(result);
    }
    else
    {
         ctx.notFound('Invalid Authorization');
    }
});

// register
router.post('/register/', async (ctx: any, next: any) =>
{
    await api.register(ctx);
});

// 404
router.all('/*', async (ctx: any) =>
{
    console.log('catchall hit');
    ctx.notFound('Invalid Path');
});

export { router };
