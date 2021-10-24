const CommonController = require('./common')
class FinanceController extends CommonController {
  async index() {
    const ctx = this.ctx
    let { limit, offset, phone, name } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    // const where = {
    //   phone: {
    //     [Op.startsWith]: phone || ''
    //   },
    //   name: {
    //     [Op.substring]: name || ''
    //   }
    // }
    const query = {
      limit,
      offset,
      // where: this.wrapplaceId(where),
      order: [['createdAt', 'DESC']]
    }
    ctx.body = await ctx.service.finance.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.finance.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.finance.create(placeId, ctx.request.body)
  }

  async update() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.finance.update(
      ctx.params.id,
      placeId,
      ctx.request.body
    )
  }
  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.finance.destroy(ctx.params.id)
  }
  async getFinanceByDate() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.finance.getFinanceByDate(placeId, ctx.request.body)
  }
}

module.exports = FinanceController
