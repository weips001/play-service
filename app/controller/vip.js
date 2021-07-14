const CommonController = require('./common')
class VipController extends CommonController {
  /**
   * 可以根据手机号、姓名、卡号来查
   */
  async index() {
    const ctx = this.ctx
    let {
      limit,
      offset,
      phone,
      name,
      cardId,
      cardType,
      restTotal
    } = this.getPageQuery()
    const { Op } = this.app.Sequelize
    const where = {
      phone: {
        [Op.startsWith]: phone || ''
      },
      name: {
        [Op.substring]: name || ''
      },
      cardId: {
        [Op.startsWith]: cardId || ''
      }
    }
    if (cardType != undefined) {
      where.cardType = cardType
    }
    if (restTotal != undefined) {
      where.restTotal = restTotal
    }
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [['createdAt', 'DESC']]
    }
    ctx.body = await ctx.service.vip.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.vip.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.vip.create(placeId, ctx.request.body)
  }

  async update() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.vip.update(
      ctx.params.id,
      placeId,
      ctx.request.body
    )
  }
  async consume() {
    const ctx = this.ctx
    const consumeNum = ctx.request.body.deleteNum
    ctx.body = await ctx.service.vip.consume(ctx.params.id, consumeNum)
  }
  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.vip.destroy(ctx.params.id)
  }
}

module.exports = VipController
