import { HmacSHA256, SHA256 } from 'crypto-js';
import * as Router from 'koa-router';
import { response } from '../../../../core/model/types/response';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';
import { WalletContext } from '../../../../core/model/types/walletContext';
import * as signature from '../../../../core/shared/signatureDal/knex/signatureKnex';
import * as api from './api';
// @ts-ignore
import { server as signing } from 'signature';
import { KnexDAL } from '../../../../core/dal/knexDal';
import { KnexSignatureDAL } from '../../../../core/shared/signatureDal/knex/signatureKnex';

const router = new Router({
    prefix: '/sg-api/v1/:tenantId',
});

// All routes will pass through here
router.all('/*', async (ctx: any, next: any) =>
{

    if (ctx.request.headers['x-evri-date'] === undefined)
    {
        console.log('No X-Evri-Date header');
        ctx.unauthorized();
        return;
    }

    let authHeader: any;
    try
    {
        authHeader =
            signing.parseAuthorization(ctx.request.headers.authorization);
    }
    catch (err)
    {
        ctx.badRequest('Invalid authorization header.');
        return;
    }

    if (ctx.params.tenantId !== authHeader.CredentialScope.Tenant)
    {
        console.log('Tenant ID mismatch');
        return ctx.unauthorized();
    }

    const signatureDal = new KnexSignatureDAL(ctx.walletDBConnection);

    const signingInfo: response =
        await signatureDal
            .lookupSignatureParams(authHeader.APIKey, ctx.params.tenantId);

    if (signingInfo[0] === 503)
    {
        return ctx.send(StatusCodes.ServiceUnavailable, 'Service Unavailable');
    }
    if (signingInfo[0] !== 200)
    {
        console.log(signingInfo[0]);
        return ctx.unauthorized();
    }

    const walletContext: WalletContext =
    {
        tenantId : ctx.params.tenantId,
        permissions : signingInfo[1].permissions,
        dep : {
            dal: new KnexDAL(ctx.walletDBConnection),
        },
    };
    const headersMap = createHeadersMap(authHeader.SignedHeaders,
        ctx.request.headers);
    const queryMap = createQueryMap(ctx.request.query);
     ctx.walletContext = walletContext;
    const dep = { algo: [HmacSHA256, SHA256] };
    const reqData = signing.createRequestData(
        ctx.request.method,
        ctx.request.url.split('?')[0],
        authHeader.Algorithm,
        authHeader.CredentialScope.Tenant,
        ctx.request.body,
        authHeader.APIKey,
        'sg-api',   // already matched from path
        'v1',       // ^ same
        'wallet',   // fixed value
        queryMap,
        authHeader.SignedHeaders,
        headersMap,
        ctx.request.headers['x-evri-date'], // datetime includes HHMMSS
        authHeader.Signature,
    );
    const validSignature =
        signing.validate(dep, reqData, signingInfo[1].secretKey);

    console.log('Signature validation was ' +
        (validSignature ? 'successful.' : 'not successful.'));

    /*
    if (!validSignature)
    {
        ctx.unauthorized();
        return;
    }
    */

    await next();
});

function createHeadersMap(
    signedHeaders: string[],
    headers: any): Map<string, string>
{
    const map: Map<string, string> = new Map();
    for (const header of signedHeaders)
    {
        map.set(header, headers[header]);
    }

    return map;
}

function createQueryMap(query: any): Map<string, string>
{
    const map: Map<string, string> = new Map();
    for (const key in query)        // tslint:disable-line: forin
    {
        map.set(key, query[key]);
    }
    return map;
}

// Balance Inquiry
router.post('/wallet', async (ctx: any) =>
{
    const result = await api.balanceInquiry(ctx);
    ctx.ok(result[1]);
});

// load/unload
router.post('/notification/cmp/transactions', async (ctx: any) =>
{
    const transcationType = ctx.request.body.TransactionType;
    let result: any;
    console.log(transcationType);
    if (transcationType.toLowerCase() === 'deposit')
    {
         result = await api.load(ctx);
    }
    else if (transcationType.toLowerCase() === 'withdrawl')
    {
        result = await api.unload(ctx);
    }
    else
    {
        ctx.notFound('Invalid Transaction type');
    }

    ctx.ok(result[1]);
});

// 404
router.all('/*', async (ctx: any) =>
{
    ctx.notFound('Invalid Path');
});

export { router };
