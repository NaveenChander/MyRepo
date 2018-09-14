import { DAL } from './dal';
import { KnexBalanceInquiryDal } from './balanceInquiry/knexDal';
import { KnexLoadDal } from './load/knexDal';
import { KnexUnloadDal } from './unload/knexDal';
import { KnexRegisterDal } from './register/knexDal';

export class KnexDAL implements DAL
{
    public BalanceInquiryDal: KnexBalanceInquiryDal;
    public LoadDal: KnexLoadDal;
    public UnloadDal: KnexUnloadDal;
    public RegisterDal: KnexRegisterDal;

    constructor(connection: any)
    {
        this.BalanceInquiryDal = new KnexBalanceInquiryDal(connection);
        this.LoadDal = new KnexLoadDal(connection);
        this.UnloadDal = new KnexUnloadDal(connection);
        this.RegisterDal = new KnexRegisterDal(connection);
    }

}
