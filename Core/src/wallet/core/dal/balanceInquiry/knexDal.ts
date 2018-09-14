import { StatusCodes } from '../../model/codes/statusCodes';
import { WalletContext } from '../../model/types/walletContext';
import { WalletAccount } from '../../model/db/walletAccount';
import { ErrorCodes } from '../../model/codes/errorCodes';
import { BalanceInquiryDalInterface } from './dal';
import { createErrorResponse } from '../../shared/knex/databaseErrors';

export class KnexBalanceInquiryDal implements BalanceInquiryDalInterface {
    private connection: any;

    constructor(
        connection: any)
    {
        if (connection === undefined)
        {
            throw [StatusCodes.InternalServerError,
                ErrorCodes.invalidDatabaseConnection];
        }
        this.connection = connection;
    }

    public async BalanceInquiryWithExternalId(
        externalId: string,
        walletContext: WalletContext)
        : Promise<[StatusCodes, WalletAccount | ErrorCodes]>
    {
        return await this.connection
        .from('PatronWalletAccount as tPatWalAct')
        .select('tPatWalAct.PatronWallet_ID',
            'tPatWalAct.Account_ID',
            'tPatWalAct.Tenant_ID',
            'tPatWalAct.Balance',
            'tPatWalAct.Limit',    // Daily limit
            'tPatWalAct.ExternalAccount_ID')
        .where({
            'tPatWalAct.ExternalAccount_ID' : externalId,
            'tPatWalAct.Tenant_ID' : walletContext.tenantId})
        .then((results: any) =>
        {
            if (results.length === 0)
            {
                return [StatusCodes.NotFound,
                    ErrorCodes.invalidWalletAccountOrTenantIdMismatch];
            }

            if (results.length > 1)
            {
                return [StatusCodes.Conflict,
                    ErrorCodes.invalidDatabaseResultLength];
            }

            try
            {
                const walletAccount: WalletAccount = new WalletAccount(
                    results[0].PatronWallet_ID,
                    results[0].Account_ID,
                    results[0].Tenant_ID,
                    results[0].Balance,
                    results[0].Limit,
                    results[0].ExternalAccount_ID,
                    );

                return [StatusCodes.OK, walletAccount];
            }
            catch (err)
            {
                console.log(err);
                return [StatusCodes.Conflict, err[1]];
            }

        })
        .catch((err: any) =>
        {
            return createErrorResponse(err);
        });
    }
}
