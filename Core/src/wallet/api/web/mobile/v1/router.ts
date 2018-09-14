import * as Router from 'koa-router';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';
import * as api from './api';

const router = new Router({
    prefix: '/mobile/v1/:tenantId',
});

// ################### Every route passes through here ###################
router.all('/*', async (ctx: any, next: any) =>
{
    // Check everi token credentials
    await next();
});

// Registration for wallet
router.post('/patron', async (ctx: any) =>
{
    api.register.register(ctx);
    ctx.send(StatusCodes.NotImplemented,
        'Registration for wallet not implemented');
});

// Link mobile device to wallet
router.put('/patron', async (ctx: any) =>
{
    api.register.linkMobileDevice(ctx);
    ctx.send(StatusCodes.NotImplemented,
        'Link Mobile Device not implemented');
});

// Balance Inquiry
router.get('/wallet/:walletid', async (ctx: any) =>
{
    api.balanceInquiry.balanceInquiry(ctx);
    ctx.send(StatusCodes.NotImplemented,
        'Balance Inquiry not implemented');
});

// Transaction History
router.get('/wallet/:walletid/transactions', async (ctx: any) =>
{
    // Get Pending Staged Transactions in the EVIPay Specifications Document

    // Note: any query params would already be stripped off at
    // this point, access them with ctx.params
    api.transactionHistory.transactionHistory(ctx);

    console.log(ctx.params);
    ctx.send(StatusCodes.NotImplemented,
        'Transaction History not implemented');
});

// ################### Catchall 404 response ###################
router.all('/*', async (ctx: any) =>
{
    ctx.notFound('Invalid Path');
});

export { router };
