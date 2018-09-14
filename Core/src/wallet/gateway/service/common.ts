import { response, responsePromise } from '../../core/model/types/response';

export interface Common {

    invoke(): responsePromise;
}
