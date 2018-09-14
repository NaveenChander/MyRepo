import { StatusCodes } from '../../../../../core/model/codes/statusCodes';
import { AuthorizationToken } from '../../../../../core/model/authToken';
import { createRequestParameters } from './requestParams';
import { AddCardRequest } from '../../../../../core/eviPay/paymentManagement/addCard';
import { AddACHRequest } from '../../../../../core/eviPay/paymentManagement/addAch';
import { ListCardsRequest } from '../../../../../core/eviPay/paymentManagement/listCards';
import { ListBankAccountsRequest } from '../../../../../core/eviPay/paymentManagement/listBankAccounts';
import { RemoveCardRequest } from '../../../../../core/eviPay/paymentManagement/removePaymentProvider';

export function list(ctx: any)
{
    const tenantId: string = ctx.params.tenantid;
    const walletId: string = ctx.params.walletid;
    const token: AuthorizationToken = ctx.request.headers.AuthenticationToken;
    const sessionId: string = '';
    const patronId: string = '';
    const merchantId: string = '';
    const deviceId: string = '';

    const request: ListCardsRequest = new ListCardsRequest(
        sessionId,
        patronId,
        merchantId,
        deviceId);

    request.send(token)
        .then((res: any) =>
        {
            console.log(res);
        })
        .catch((err: any) =>
        {
            console.log(err);
        });

    return ctx.send(StatusCodes.NotImplemented,
        'Listing Cards and Bank Info not implemented');
}

export function addCard(ctx: any)
{
    const tenantId: string = ctx.params.tenantid;
    const walletId: string = ctx.params.walletid;
    const token: AuthorizationToken = ctx.request.headers.AuthenticationToken;

    const sessionId: string = '';
    const patronId: string = '';
    const deviceId: string = '';

    const request: AddCardRequest = new AddCardRequest(
        sessionId,
        deviceId,
        patronId,
        ctx.request.body.CardNumber,
        ctx.request.body.CardExpiry,
        ctx.request.body.CardHolderName,
        ctx.request.body.ZipCode,
        ctx.request.body.ConsentToSave);

    request.send(token)
        .then((res: any) =>
        {
            console.log(res);
        })
        .catch((err: any) =>
        {
            console.log(err);
        });

    return ctx.send(StatusCodes.NotImplemented,
        'Adding a card not implemented');
}

export function addAch(ctx: any)
{
    const tenantId: string = ctx.params.tenantid;
    const walletId: string = ctx.params.walletid;
    const token: AuthorizationToken = ctx.request.headers.AuthenticationToken;
    const sessionId: string = '';
    const patronId: string = '';
    const deviceId: string = '';

    const request: AddACHRequest = new AddACHRequest(
        sessionId,
        deviceId,
        patronId,
        ctx.request.body.RoutingNumber,
        ctx.request.body.AccountNumber,
        ctx.request.body.ConsentToSave);

    request.send(token)
        .then((res: any) =>
        {
            console.log(res);
        })
        .catch((err: any) =>
        {
            console.log(err);
        });

    return ctx.send(StatusCodes.NotImplemented,
        'Adding an ECH not implemented');
}

export function remove(ctx: any)
{
    const tenantId: string = ctx.params.tenantid;
    const walletId: string = ctx.params.walletid;
    const providerId: string = ctx.params.providerid;
    const token: AuthorizationToken = ctx.request.headers.AuthenticationToken;

    const sessionId: string = '';
    const patronId: string = '';
    const deviceId: string = '';

    const request: RemoveCardRequest = new RemoveCardRequest(
        sessionId,
        deviceId,
        patronId,
        providerId);

    request.send(token)
        .then((res: any) =>
        {
            console.log(res);
        })
        .catch((err: any) =>
        {
            console.log(err);
        });

    return ctx.send(StatusCodes.NotImplemented,
        'Deleting Cards and Bank Info not implemented');
}
