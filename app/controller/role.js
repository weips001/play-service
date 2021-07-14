const CommonController = require('./common')
class RoleController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, roleName } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      roleName: {
        [Op.startsWith]: roleName || ''
      }
    }
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [
        ['createdAt', 'Asc'],
        ['roleName', 'ASC']
      ]
    }
    ctx.body = await ctx.service.role.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.role.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.role.create(placeId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.role.update(ctx.params.id, placeId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.role.destroy(ctx.params.id)
  }
  async getAllRole() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.role.getAllRole(placeId)
  }
}

module.exports = RoleController
