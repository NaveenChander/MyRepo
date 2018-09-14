"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("../../../db/connection");
const knexDal_1 = require("../../../core/dal/knexDal");
// let walletContext: WalletContext;
function getWallet(permissions) {
    return {
        WalletContext: {
            dep: { dal: new knexDal_1.KnexDAL(knex) },
            everiPatronId: 'test' + Date.now(),
            permissions: [permissions],
            tenantId: '1',
        },
    };
}
exports.getWallet = getWallet;
function getWalletContext(permissions) {
    return {
        dep: { dal: new knexDal_1.KnexDAL(knex) },
        everiPatronId: 'test' + Date.now(),
        permissions: [permissions],
        tenantId: '1',
    };
}
exports.getWalletContext = getWalletContext;
