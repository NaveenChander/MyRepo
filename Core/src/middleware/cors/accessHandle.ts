export async function cors(ctx: any, next: any)
{

    ctx.set('Access-Control-Allow-Origin', '*');

    const accessHeaders =
        ctx.headers['access-control-request-headers'];

    if (accessHeaders)
    {
        ctx.set('Access-Control-Allow-Headers', accessHeaders);
    }

    ctx.set('Access-Control-Allow-Methods',
        'POST, GET, PUT, DELETE, OPTIONS, HEAD');
    // ctx.set('Access-Control-Expose-Headers', options.expose);

    // if(ctx.request.header['access-control-request-method'])
    //     return

    // lets preflight checks return
    if (ctx.request.method === 'OPTIONS')
    {
        ctx.status = 204;
        return;
    }

    await next();
}
