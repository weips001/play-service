const Service = require('egg').Service

class CommonService extends Service {
  getPlaceId() {
    const ctx = this.ctx
    const placeId = ctx.header['place-id']
    return placeId || null
  }
  wrapplaceId(options) {
    const placeId = this.getPlaceId()
    if (placeId) {
      return {
        ...options,
        placeId
      }
    }
    return options
  }

  createToken(userId) {
    const expiresIn = 60 * 60
    const app = this.app
    const token = app.jwt.sign(
      {
        userId
      },
      app.config.jwt.secret,
      {
        expiresIn
      }
    )
    return token
  }

  success(data, msg = null) {
    return {
      code: 0,
      data,
      msg
    }
  }

  error(data = null, msg) {
    return {
      code: 1,
      data,
      msg
    }
  }
  noPlace() {
    return this.error(null, '当前用户没有绑定驾校，无法操作！')
  }
}
module.exports = CommonService
