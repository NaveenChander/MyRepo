import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as respond from 'koa-respond';

import { cors } from '../../../middleware/cors/accessHandle';
import { router as sgRouter } from './scientificGames/v1/router';
import { router as v1Router } from './iGamer/router';

const app = new Koa();
const router = new Router();

import { connection } from '../../db/connection';

app .use(respond())
    .use(async (ctx: any, next: any) =>
    {
        try
        {
            await next();
        }
        catch (err)
        {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            {
                ctx.internalServerError(err.message);
                console.log(err);
            }
        }
    })
    .use(async (ctx: any, next: any) =>
    {
        ctx.walletDBConnection = connection;
        await next();
    })
    .use(cors)
    .use(bodyParser())
    .use(router.routes());

router.all('/v1/*', v1Router.routes());
router.all('/sg-api/*', sgRouter.routes());

const port = process.env.PORT || 8000;
app.listen(port, () =>
{
    console.log('Listening on port ' + port + '!');
});
