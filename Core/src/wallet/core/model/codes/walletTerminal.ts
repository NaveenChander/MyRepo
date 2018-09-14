export enum WalletTerminalCodes {
    Lookup = 'W100',
    RegistrationRequest = 'W200',
    CreditRequest = 'W300',
    DebitRequest = 'W310',
    FundTransfer = 'W320',
    UpdateKYC = 'W400',
    DeviceInquiry = 'W500', // when mobile device is tapped
        // at the kiosk and pin is entered
    GetPendingStagedActions = 'W510',
}
