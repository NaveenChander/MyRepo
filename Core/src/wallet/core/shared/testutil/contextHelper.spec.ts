import { WalletContext } from '../../model/types/walletContext';
import knex = require('../../../db/connection');
import { KnexDAL } from '../../../core/dal/knexDal';

// let walletContext: WalletContext;

export function getWallet(permissions: any)
{
    return {
        WalletContext: {
            dep: { dal: new KnexDAL(knex) },
            everiPatronId: 'test' + Date.now(),
            permissions: [permissions],
            tenantId: '1',
        },
    };
}

export function getWalletContext(permissions: any)
{
    return {
        dep: { dal: new KnexDAL(knex) },
        everiPatronId: 'test' + Date.now(),
        permissions: [permissions],
        tenantId: '1',
    };
}
