const CommonController = require('./common')
class RoleAuthController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset } = this.getPageQuery()
    const where = {}
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [['createdAt', 'DESC']]
    }
    ctx.body = await ctx.service.roleAuth.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.roleAuth.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.roleAuth.create(placeId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.roleAuth.update(ctx.params.id, placeId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.roleAuth.destroy(ctx.params.id)
  }
  async bindAuth() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.roleAuth.bindAuth(placeId, body)
  }
  async getAuthFromRole() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.roleAuth.getAuthFromRole(placeId, body.roleId)
  }
}

module.exports = RoleAuthController
