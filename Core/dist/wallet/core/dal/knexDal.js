"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knexDal_1 = require("./balanceInquiry/knexDal");
const knexDal_2 = require("./load/knexDal");
const knexDal_3 = require("./unload/knexDal");
const knexDal_4 = require("./register/knexDal");
class KnexDAL {
    constructor(connection) {
        this.BalanceInquiryDal = new knexDal_1.KnexBalanceInquiryDal(connection);
        this.LoadDal = new knexDal_2.KnexLoadDal(connection);
        this.UnloadDal = new knexDal_3.KnexUnloadDal(connection);
        this.RegisterDal = new knexDal_4.KnexRegisterDal(connection);
    }
}
exports.KnexDAL = KnexDAL;
