const CommonController = require('./common')
class AdminController extends CommonController {
  async index () {
    const ctx = this.ctx
    let {limit, offset, phone} = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const query = {
      limit,
      offset,
      where: {
        phone: {
          [Op.startsWith]: phone || ''
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    }
    ctx.body = await ctx.service.admin.list(query)
  }

  async show () {
    const ctx = this.ctx
    ctx.body = await ctx.service.admin.detail(ctx.params.id)
  }

  async create () {
    const ctx = this.ctx
    ctx.body = await ctx.service.admin.create(ctx.request.body)
  }

  async update () {
    const ctx = this.ctx
    ctx.body = await ctx.service.admin.update(ctx.params.id, ctx.request.body)
  }

  async destroy () {
    const ctx = this.ctx
    ctx.body = await ctx.service.admin.destroy(ctx.params.id)
  }
}

module.exports = AdminController
