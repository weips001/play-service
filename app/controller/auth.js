const CommonController = require('./common')
class AuthController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, authName } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      authName: {
        [Op.startsWith]: authName || ''
      }
    }
    const query = {
      limit,
      offset,
      where,
      order: [
        ['createdAt', 'DESC'],
        ['authName', 'ASC']
      ]
    }
    ctx.body = await ctx.service.auth.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.auth.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    let { body } = ctx.request
    ctx.body = await ctx.service.auth.create(body)
  }

  async update() {
    const ctx = this.ctx
    let { body } = ctx.request
    ctx.body = await ctx.service.auth.update(ctx.params.id, body)
  }

  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.auth.destroy(ctx.params.id)
  }
  async getAllAuth() {
    const ctx = this.ctx
    ctx.body = await ctx.service.auth.getAllAuth()
  }
}

module.exports = AuthController
