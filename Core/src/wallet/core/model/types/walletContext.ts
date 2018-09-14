import { DAL } from '../../dal/dal';

export interface WalletContext
{
    dep: {
        dal: DAL,
    };
    permissions: string[];
    tenantId: string;
    everiPatronId?: string;
}
