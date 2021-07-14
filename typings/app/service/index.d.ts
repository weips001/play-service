// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdmin = require('../../../app/service/admin');
import ExportAuth = require('../../../app/service/auth');
import ExportCommon = require('../../../app/service/common');
import ExportPlace = require('../../../app/service/place');
import ExportRole = require('../../../app/service/role');
import ExportRoleAuth = require('../../../app/service/roleAuth');
import ExportUser = require('../../../app/service/user');
import ExportUserRole = require('../../../app/service/userRole');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
    admin: AutoInstanceType<typeof ExportAdmin>;
    auth: AutoInstanceType<typeof ExportAuth>;
    common: AutoInstanceType<typeof ExportCommon>;
    place: AutoInstanceType<typeof ExportPlace>;
    role: AutoInstanceType<typeof ExportRole>;
    roleAuth: AutoInstanceType<typeof ExportRoleAuth>;
    user: AutoInstanceType<typeof ExportUser>;
    userRole: AutoInstanceType<typeof ExportUserRole>;
    vip: AutoInstanceType<typeof ExportVip>;
  }
}
