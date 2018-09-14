// detailed internal codes to be used throughout the system
export enum ErrorCodes {
    OK = 'Success',
    invalidWalletAccountParameters =
        'Invalid wallet account parameters.',
    invalidBalanceInquiryResultParameters =
        'Invalid Balance Inquiry parameters.',
    invalidDatabaseResultLength =
        'Invalid result length for a database query.',
    invalidDatabaseConnection =
        'Invalid database connection.',
    needNewCode =
        'Placholder Code',
    insuffientfunds= 'Balance is less than the amount requested',
    limitExceded = 'Cash limit exceded',
    invalidTranscationType= 'Transcation type is not defined',
    invalidTenantId = 'TenantId is not defined properly ',
    invalidExternalpatronId = 'External patron id is not defined properly',
    invalidAmount = 'Amount is negative or zero',
    databaseTimeout =
        'Database timed out.',
    unknown =
        'An unknown error occured',
    invalidWalletAccountOrTenantIdMismatch =
        'The wallet was either not found or ' +
        'the tenant ID didn\'t match',
    apiKeyNotFoundOrTenantIdMismatch =
        'No api key was found, or Tenant ID didn\'t match',
    invalidDatabaseCredentials =
        'Database credentials not accepted.',
    invalidPermission =
        'Permission not granted.',
    invalidSecretKeyOrTenantIdMismatch =
        'The Secret key is either not found or ' +
        'the tenant ID didn\'t match',
    invalidWalletWithIdMismatch =
        'The wallet was either not found or ' +
        'the tenant ID & Everipatronid didn\'t match',
    invalidAccountWithIdMismatch =
        'The account was either not found or ' +
        'the tenant ID & Everipatronid didn\'t match',
    invalidAdaptorWithIdMismatch =
        'The Adapter Config was either not found or ' +
        'the tenant ID & Account ID didn\'t match',
    failedWalletCreation =
        'Wallet creation failed',
    failedAccountCreation =
        'Wallet Account creation failed',
    invalidAuthorizationTokenParams =
        'The Authorization Token Class had invalid params',
    invalidBankAccountParams =
        'The Bank Account Class had invalid params',
    invalidcreditCardParams =
        'The Credit Card Class had invalid params',
    invalidAddCardRequestParams =
        'The Add Card Request had invalid params',
    invalidAddACHRequestParams =
        'The Add ACH Request had invalid params',
    invalidListCardsRequestParams =
        'The List Cards Request had invalid params',
    invalidListBankAccountsRequestParams =
        'The Bank Accounts Request had invalid params',
    invalidLoadWalletRequestParams =
        'The Load Wallet Request had invalid params',

}
