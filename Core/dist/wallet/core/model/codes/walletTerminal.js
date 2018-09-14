"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WalletTerminalCodes;
(function (WalletTerminalCodes) {
    WalletTerminalCodes["Lookup"] = "W100";
    WalletTerminalCodes["RegistrationRequest"] = "W200";
    WalletTerminalCodes["CreditRequest"] = "W300";
    WalletTerminalCodes["DebitRequest"] = "W310";
    WalletTerminalCodes["FundTransfer"] = "W320";
    WalletTerminalCodes["UpdateKYC"] = "W400";
    WalletTerminalCodes["DeviceInquiry"] = "W500";
    // at the kiosk and pin is entered
    WalletTerminalCodes["GetPendingStagedActions"] = "W510";
})(WalletTerminalCodes = exports.WalletTerminalCodes || (exports.WalletTerminalCodes = {}));
