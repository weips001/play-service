const CommonController = require('./common')
class GameBiController extends CommonController {
  /**
   * 可以根据手机号、姓名、卡号来查
   */
  async index() {
    const ctx = this.ctx
    const query = this.getPageQuery()
    let { limit, offset, phone, name, cardId, cardType, restTotal } = query
    // const { Op } = this.app.Sequelize
    // const where = {
    //   // phone: {
    //   //   [Op.startsWith]: phone || ''
    //   // },
    //   // name: {
    //   //   [Op.substring]: name || ''
    //   // },
    //   cardId: {
    //     [Op.startsWith]: cardId || ''
    //   }
    // }
    // if (cardType != undefined) {
    //   where.cardType = cardType
    // }
    // if (restTotal != undefined) {
    //   where.restTotal = restTotal
    // }
    // const query = {
    //   limit,
    //   offset,
    //   where: this.wrapplaceId(where),
    //   order: [['createdAt', 'DESC']]
    // }
    console.log(query)
    ctx.body = await ctx.service.gameBi.list(query)
  }

  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.service.gameBi.detail(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    const body = ctx.request.body
    if (body.total != undefined) {
      body.restTotal = body.total
      body.usedTotal = 0
      body.isYearCard = body.cardType === '1'
    }
    ctx.body = await ctx.service.gameBi.create(placeId, body)
  }

  async update() {
    const ctx = this.ctx
    const placeId = this.getPlaceId()
    ctx.body = await ctx.service.gameBi.update(
      ctx.params.id,
      placeId,
      ctx.request.body
    )
  }
  async consume() {
    const ctx = this.ctx
    const consumeNum = ctx.request.body.deleteNum
    ctx.body = await ctx.service.gameBi.consume(ctx.params.id, consumeNum)
  }
  async destroy() {
    const ctx = this.ctx
    ctx.body = await ctx.service.gameBi.destroy(ctx.params.id)
  }

  async getTaoRecharge() {
    const ctx = this.ctx
    let { limit, offset, vipId } = this.getPageQuery()
    const where = {
      vipId
    }
    const query = {
      limit,
      offset,
      where: this.wrapplaceId(where),
      order: [['createdAt', 'Asc']]
    }
    ctx.body = await ctx.service.gameBi.getTaoRecharge(query)
  }
}

module.exports = GameBiController
