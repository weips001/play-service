// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheck = require('../../../app/middleware/check');
import ExportErrorHandler = require('../../../app/middleware/error_handler');
import ExportJwt = require('../../../app/middleware/jwt');

declare module 'egg' {
  interface IMiddleware {
    check: typeof ExportCheck;
    errorHandler: typeof ExportErrorHandler;
    jwt: typeof ExportJwt;
  }
}
