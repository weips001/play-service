const CommonController = require('./common')
class UserRoleController extends CommonController {
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
    ctx.body = await ctx.service.userRole.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.userRole.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.userRole.create(placeId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.userRole.update(ctx.params.id, placeId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.userRole.destroy(ctx.params.id)
  }
  async bindRole() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.userRole.bindRole(placeId, body)
  }

  async getRoleIdsByUser() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.userRole.getRoleIdsByUser(placeId, body.userId)
  }
}

module.exports = UserRoleController
