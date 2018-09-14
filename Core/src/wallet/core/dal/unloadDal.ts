import { responsePromise } from '../model/types/response';
import { StatusCodes } from '../model/codes/statusCodes';
import { response } from '../model/types/response';
import * as Knex from 'knex';
import { FlakeId } from '../shared/idGenerator/flakeId';

export async function unloadCashFromWalletDal(
  tenantId: number,
  externalpatronId: string,
  propertyCode: string,
  transcationType: string,
  operatorTranscationId: string,
  amount: number,
  fundingType: string,
  walletDBcon: Knex)
  : Promise<[StatusCodes, { walletId: string; Balance: string }]>
 {
    const walletResult = await getPatronWallet(
        walletDBcon,
        tenantId,
        externalpatronId,
        amount);

    let QueryResults;
    const trasncationid: FlakeId = new FlakeId({});

  const promise = new Promise((resolve, reject) =>
  {
    if (walletResult[0] === StatusCodes.OK)
    {
      const walletId: number = walletResult[1].walletId;
      const balance: number = walletResult[1].Balance;
      console.log(walletResult[1]);

      const transcations = {
        Transaction_ID: trasncationid.gen(),
        Wallet_ID: walletId,
        SourceFundType: 'Cash',
        SourceAmount: amount,
        SourceSystem: 'EBS',
        SourceAddress: 'SG',
        DestintationFundType: 'Wallet',
        DestinationAmount: balance,
        DestintationSystem: 'Wallet',
        DestinationAddress: 'Everi',
        TransactionType: transcationType,
      };

      walletDBcon.transaction((trx: any) =>
      {
        trx('WalletAccount')
          .update({ Balance: balance - amount })
          .where({ Wallet_ID: walletId })
          .then(() =>
          {
            trx('Transaction')
              .insert(transcations)
              .then(() =>
              {
                trx.commit();

                const obj = {
                  Data: {
                    transactionId: operatorTranscationId,
                    CreatedOn: Date().toString(),
                    Amount: {
                      amount,
                      currency: '$',
                    },
                    TransactionType: 'WithDrawl',
                    Status: 2,
                    Message: 'Withdarawl of ' + amount + ' is successfull',
                    Success: true,
                  },
                };
                resolve(obj);
              })
              .catch((err: any) =>
              {
                reject(err);
              });
          })
          .catch((err: any) =>
          {
            reject(err);
          });
      });
    }
    else
    {
      reject(walletResult[1]);
    }
  });

  await promise
    .then((obj) =>
    {
      QueryResults = [StatusCodes.OK, obj];
    })
    .catch((err) =>
    {
      QueryResults = [StatusCodes.NotFound, err];
    });

  return QueryResults;
}

async function getPatronWallet(
  walletDBcon: Knex,
  tenantId: number,
  externalpatronId: string,
  amount: number,
): Promise<[StatusCodes, { walletId: number; Balance: number }]>
{
  let walletId: string;
  let QueryResults;
  let errorCode: { statusCode: StatusCodes; Message: string };

  const promise = new Promise((resolve, reject) =>
  {
    walletDBcon('PatronWallet')
      .select('Wallet_ID')
      .where({ Tenant_ID: tenantId, EveriPatron_ID: externalpatronId })
      .then((result: any) =>
      {
        if (result.length > 0)
        {
          walletId = result[0].Wallet_ID;
          walletDBcon('WalletAccount')
            .select('Balance')
            .where({ Wallet_ID: walletId })
            .then((rows) =>
            {
              if (rows.length > 0)
              {
                const balance = rows[0].Balance;
                if (balance - amount > 0)
                {
                  const dbResult: { walletId: string; Balance: string } = {
                    walletId,
                    Balance: balance,
                  };
                  resolve(dbResult);
                }
                else
                {
                  errorCode = {
                    statusCode: StatusCodes.Conflict,
                    Message:
                      'Not enough Funds to download, The balance is' + balance,
                  };
                  reject(errorCode);
                }
              }
            });
        }
        else
        {
          errorCode = {
            statusCode: StatusCodes.NotFound,
            Message: 'Not able to find the wallet Account',
          };
          reject(errorCode);
        }
      })
      .catch((err: any) =>
      {
        errorCode = {
          statusCode: StatusCodes.InternalServerError,
          Message: err,
        };
        reject(err);
      });
  });

  await promise
    .then((obj: { walletId: string; Balance: string }) =>
    {
      QueryResults = [StatusCodes.OK, obj];
    })
    .catch((err: any) =>
    {
      QueryResults = [err.statusCode, err.message];
    });

  return QueryResults;
}
