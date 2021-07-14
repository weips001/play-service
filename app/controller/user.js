const CommonController = require('./common')
class UserController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, name, phone } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      name: {
        [Op.startsWith]: name || ''
      },
      phone: {
        [Op.startsWith]: phone || ''
      }
    }
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [
        ['createdAt', 'DESC'],
        ['name', 'ASC']
      ]
    }
    ctx.body = await ctx.service.user.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.user.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.user.create(placeId, body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.user.update(ctx.params.id, placeId, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.user.destroy(ctx.params.id)
  }
  async login() {
    const ctx = this.ctx
    ctx.body = await ctx.service.user.login(ctx.request.body)
  }
  async getCurrentUser() {
    const ctx = this.ctx
    ctx.body = await ctx.service.user.getCurrentUser()
  }
}

module.exports = UserController
