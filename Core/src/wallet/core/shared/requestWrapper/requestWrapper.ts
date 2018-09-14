import * as rp from 'request-promise';

export function POST(
    uri: string,
    body: object,
    headers: object,
    isJson: boolean)
{
    const options = {
        method: 'POST',
        uri,
        body,
        headers,
        json: isJson,
    };
    return rp(options);
}

export function GET(
    uri: string,
    headers: object)
{
    const options = {
        method: 'GET',
        uri,
        headers,
    };
    return rp(options);
}

export function DELETE(
    uri: string,
    headers: object)
{
    const options = {
        method: 'DELETE',
        uri,
        headers,
    };
    return rp(options);
}
