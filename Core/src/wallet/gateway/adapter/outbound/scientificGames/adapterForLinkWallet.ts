import { responsePromise } from '../../../../core/model/types/response';
import { StatusCodes } from '../../../../core/model/codes/statusCodes';
import * as request from 'request-promise';

export async function execute(externalInterfaceData: any): responsePromise
{
  let requestObj = {};
  let externalResponse;

  const configJson = externalInterfaceData.Adapter_Config;

  if (configJson.content === 'body')
  {
    requestObj = {}; // TODO
  }

  externalResponse = await callExternalService(requestObj, configJson);

  return externalResponse;
}

async function callExternalService(
                        requestObj: any,
                        config: any): responsePromise
{
  let externalResponse;

  const options = {
        url: config.baseURL + config.path,
        method: config.method,
        headers: constructHeader(config.headers),
        form: requestObj,
  };

  await request(options).then((resp: any) =>
  {
    externalResponse = resp;
  }).catch((err: any) =>
  {
      console.log('Error', err);
      return [StatusCodes.InternalServerError, err];
  });

  return [StatusCodes.OK, externalResponse];
}

function constructHeader(headers: any)
{
  const obj = headers[0];
  for (const key in obj)
  {
    if (obj.hasOwnProperty(key))
    {
       obj[key] = mapHeaderValues(key, obj[key], headers);
    }
  }
  return headers;
}

function mapHeaderValues(headerKey: any, headerValue: any, headers: any)
{
  switch (headerKey)
  {
      case 'X-Evri-Key':
      {
        return 'authkey';
      }
      case 'X-Everi-Date':
      {
        return '20180625T204307Z';
      }
      case 'X-Everi-SignedHeaders':
      {
        return mapSignedHeader(headers);
      }
      case 'authorization':
      {
        return 'authorization';
      }
  }

}

function mapSignedHeader(headers: any)
{
  const obj = headers[0];
  let signedHeader: string = '';
  for (const key in obj)
  {
    if (obj.hasOwnProperty(key))
    {
      signedHeader = signedHeader + key + ';';
    }
  }
  return signedHeader;
}
