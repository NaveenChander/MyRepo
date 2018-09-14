import { response, responsePromise } from '../../../core/model/types/response';
import { StatusCodes } from '../../../core/model/codes/statusCodes';
import { ErrorCodes } from '../../../core/model/codes/ErrorCodes';
import { ActionTypes } from '../../../core/model/actionTypes';
import { WalletContext } from '../../../core/model/types/walletContext';

export async function route(walletContext: WalletContext,
                            walletAccountID: any,
                            actionType: ActionTypes): responsePromise
{

  const adapterConfig =
      await walletContext.dep.dal.RegisterDal.LookupAdapterConfig(
                                walletContext,
                                walletAccountID);

  if (adapterConfig[0] !== StatusCodes.OK)
  {
    const err: response = [StatusCodes.NotFound,
                          ErrorCodes.invalidAdaptorWithIdMismatch];
    return err;
  }

  const externalInterfaceData: any | ErrorCodes = adapterConfig[1];

  for (const data of externalInterfaceData)
  {
    const vendor = data.Vendor_Name;
    const action = actionType;
    let adapter;
    try
    {
      adapter = await import(`./${vendor}/adapterFor${action}`);
    }
    catch (err)
    {
      throw err;
    }

    return await adapter.execute(data);
  }

}
