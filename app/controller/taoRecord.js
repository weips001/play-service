const CommonController = require('./common')
class TaoRecordController extends CommonController {
  /**
   * 可以根据手机号、姓名、卡号来查
   */
  async index() {
    const ctx = this.ctx
    const query = this.getPageQuery()
    let { limit, offset, vipId, name, cardId, cardType, restTotal } = query
    const { Op } = this.app.Sequelize
    const where = {
      // phone: {
      //   [Op.startsWith]: phone || ''
      // },
      // name: {
      //   [Op.substring]: name || ''
      // },
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
    // const query = {
    //   limit,
    //   offset,
    //   where: this.wrapplaceId(where),
    //   order: [['createdAt', 'DESC']]
    // }
    ctx.body = await ctx.service.taoRecharge.list(query)
  }

  // async show() {
  //   const ctx = this.ctx
  //   ctx.body = await ctx.service.taoRecharge.detail(ctx.params.id)
  // }

  // async create() {
  //   const ctx = this.ctx
  //   const placeId = this.getPlaceId()
  //   ctx.body = await ctx.service.taoRecharge.create(placeId, ctx.request.body)
  // }

  // async update() {
  //   const ctx = this.ctx
  //   const placeId = this.getPlaceId()
  //   ctx.body = await ctx.service.taoRecharge.update(
  //     ctx.params.id,
  //     placeId,
  //     ctx.request.body
  //   )
  // }

  // async destroy() {
  //   const ctx = this.ctx
  //   ctx.body = await ctx.service.taoRecharge.destroy(ctx.params.id)
  // }
}

module.exports = TaoRecordController
