import * as Router from 'koa-router';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';

const router = new Router({
    prefix: '/spa/*',
});

// middleware for all paths
router.all('/*', async (ctx: any, next: any) =>
{
    await next();
});

// catchall 404
router.all('/*', async (ctx: any) =>
{
    ctx.notFound('Invalid Path');
});

export { router };
