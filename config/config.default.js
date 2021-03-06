/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  config.cluster = {
    listen: {
      path: '',
      port: 7007
    }
  }
  exports.sequelize = {
    dialect: 'mysql',
    host: '39.99.228.79',
    // host: '127.0.0.1',
    username: 'root',
    password: 'Wps097200.+',
    port: 3508,
    database: 'play',
    timezone: '+08:00',
    define: {
      underscored: true,
      freezeTableName: true
    }
  }
  // exports.sequelize = {
  //   dialect: 'mysql',
  //   host: '10.213.134.254',
  //   username: 'root',
  //   password: 'www.2020',
  //   port: 3306,
  //   database: 'wps',
  //   timezone: '+08:00',
  //   define: {
  //     underscored: true,
  //     freezeTableName: true
  //   }
  // }

  config.multipart = {
    mode: 'file',
    fileExtensions: ['.xls', '.xlsx']
  }

  config.onerror = {
    json(err, ctx) {
      console.log(err)
      const { errors = [], name } = err
      if (name === 'SequelizeValidationError') {
        ctx.body = {
          code: 1,
          data: null,
          msg: errors[0] && errors[0].message || '验证异常'
        }
        ctx.status = 200
        return
      }
      // json hander
      ctx.body = {
        code: 1,
        data: null,
        msg: '服务器异常'
      };
      ctx.status = 500;
    },
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.jwt = {
    secret: '123456' // 自定义 token 的加密条件字符串
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'] // 允许访问接口的白名单
  }

  config.static = {
    prefix: '/',
    dir: process.cwd() + '/public'
  }

  config.rundir = process.cwd() + '/run'

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577165435387_2425'

  // add your middleware config here
  config.middleware = ['check']

  exports.check = {
    match(ctx) {
      const { request } = ctx
      const { method, url } = request
      const whiteUrl = ['/api/user/login', '/api/place', '/api/auth']
      const isInUrl = whiteUrl.some(item => url.startsWith(item))
      if (isInUrl) {
        return false
      }
      // console.log(request)
      const whiteMethod = ['POST', 'PUT']
      // console.log('request.method', method)
      return whiteMethod.includes(method)
    }
  }

  exports.http = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    },
    timeout: 10000
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig
  }
}
