// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdmin = require('../../../app/service/admin');
import ExportAuth = require('../../../app/service/auth');
import ExportCommon = require('../../../app/service/common');
import ExportFinance = require('../../../app/service/finance');
import ExportPlace = require('../../../app/service/place');
import ExportRole = require('../../../app/service/role');
import ExportRoleAuth = require('../../../app/service/roleAuth');
import ExportTaoRecharge = require('../../../app/service/taoRecharge');
import ExportTaoRecord = require('../../../app/service/taoRecord');
import ExportUser = require('../../../app/service/user');
import ExportUserRole = require('../../../app/service/userRole');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
    admin: AutoInstanceType<typeof ExportAdmin>;
    auth: AutoInstanceType<typeof ExportAuth>;
    common: AutoInstanceType<typeof ExportCommon>;
    finance: AutoInstanceType<typeof ExportFinance>;
    place: AutoInstanceType<typeof ExportPlace>;
    role: AutoInstanceType<typeof ExportRole>;
    roleAuth: AutoInstanceType<typeof ExportRoleAuth>;
    taoRecharge: AutoInstanceType<typeof ExportTaoRecharge>;
    taoRecord: AutoInstanceType<typeof ExportTaoRecord>;
    user: AutoInstanceType<typeof ExportUser>;
    userRole: AutoInstanceType<typeof ExportUserRole>;
    vip: AutoInstanceType<typeof ExportVip>;
  }
}
