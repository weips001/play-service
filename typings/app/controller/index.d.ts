// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/controller/admin');
import ExportAuth = require('../../../app/controller/auth');
import ExportCheckFile = require('../../../app/controller/checkFile');
import ExportCommon = require('../../../app/controller/common');
import ExportFinance = require('../../../app/controller/finance');
import ExportGameBi = require('../../../app/controller/gameBi');
import ExportPlace = require('../../../app/controller/place');
import ExportRole = require('../../../app/controller/role');
import ExportRoleAuth = require('../../../app/controller/roleAuth');
import ExportTaoRecharge = require('../../../app/controller/taoRecharge');
import ExportTaoRecord = require('../../../app/controller/taoRecord');
import ExportUser = require('../../../app/controller/user');
import ExportUserRole = require('../../../app/controller/userRole');
import ExportVip = require('../../../app/controller/vip');

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    auth: ExportAuth;
    checkFile: ExportCheckFile;
    common: ExportCommon;
    finance: ExportFinance;
    gameBi: ExportGameBi;
    place: ExportPlace;
    role: ExportRole;
    roleAuth: ExportRoleAuth;
    taoRecharge: ExportTaoRecharge;
    taoRecord: ExportTaoRecord;
    user: ExportUser;
    userRole: ExportUserRole;
    vip: ExportVip;
  }
}
