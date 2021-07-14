const Controller = require('egg').Controller

class CommonController extends Controller {
  getPageQuery() {
    const ctx = this.ctx
    let { pageSize, current, ...other } = ctx.query
    pageSize = ctx.helper.toInt(ctx.query.pageSize) || 20
    current = ctx.helper.toInt(ctx.query.current) || 1
    const offset = (current - 1) * pageSize
    const query = {
      ...other,
      limit: pageSize,
      offset
    }
    return query
  }
  getPlaceId() {
    const ctx = this.ctx
    const placeId = ctx.header['place-id']
    return placeId || null
  }
  getToken() {
    const ctx = this.ctx
    const authorization = ctx.request.header.authorization
    if (authorization && authorization.length > 7) {
      const token = authorization.substr(7, 1000)
      return token
    }
    return null
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
}

module.exports = CommonController
