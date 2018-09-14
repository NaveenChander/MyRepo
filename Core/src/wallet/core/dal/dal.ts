import { BalanceInquiryDalInterface } from './balanceInquiry/dal';
import { UnloadDalInterface } from './unload/dal';
import { RegisterDalInterface } from './register/dal';
import { LoadDalInterface } from './load/dal';

export interface DAL {
    BalanceInquiryDal: BalanceInquiryDalInterface;
    UnloadDal: UnloadDalInterface;
    LoadDal: LoadDalInterface;
    RegisterDal: RegisterDalInterface;
}
