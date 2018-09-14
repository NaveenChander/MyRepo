import * as Router from 'koa-router';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';
import * as api from './api';

const router = new Router({
    prefix: '/pci-api/v1/:tenantId',
});

// middleware for all paths
router.all('/*', async (ctx: any, next: any) =>
{
    await next();
});

// retrieves a list of cards and bank info
router.get('/wallet/:walletid/paymentProviders', async (ctx: any) =>
{
    // Wallet Lookup? in the EVIPay Specifications Document
    await api.paymentProvider.list(ctx);
});

// add a card payment provider
router.post('/wallet/:walletid/paymentProviders/cards', async (ctx: any) =>
{
    await api.paymentProvider.addCard(ctx);
});

// add an ACH payment provider
router.post('/wallet/:walletid/paymentProviders/ECH', async (ctx: any) =>
{
    ctx.send(StatusCodes.NotImplemented,
        'Adding an ECH payment provider not implemented');
});

// delete a payment provider by code
router.delete('/wallet/:walletid/paymentProviders/:providerid',
    async (ctx: any) =>
{
    console.log(ctx.params.providerid);
    api.paymentProvider.remove(ctx);
});

// funding a wallet from providerId
router.post('/wallet/:walletid/paymentProviders/:providerid',
    async (ctx: any) =>
{
    await api.fund.wallet(ctx);
});

// catchall 404
router.all('/*', async (ctx: any) =>
{
    ctx.notFound('Invalid Path');
});

export { router };
