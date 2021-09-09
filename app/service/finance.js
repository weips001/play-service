'use strict'

const CommenService = require('./common')

class FinanceService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Finance.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const finance = await ctx.model.Finance.findByPk(id)
    if (finance) {
      return this.success(finance, '获取详情成功')
    }
    return this.error(null, '无当前数据，获取详情失败')
  }

  async create(placeId, body) {
    const { ctx, app } = this
    const { Sequelize } = app
    const { Op, where } = Sequelize
    const params = {
      ...body,
      placeId
    }
    try {
      // const finance = await ctx.model.Finance.create(params, {
      //   fields: [
      //     'totalMoney',
      //     'personNum',
      //     'cashMoney',
      //     'paidMoney',
      //     'paidDesc',
      //     'placeId',
      //     "createdAt"
      //   ]
      // })
      const [finance, created] = await ctx.model.Finance.findOrCreate({
        where: {
          [Op.and]: [
            where(
              Sequelize.fn('DATE', Sequelize.col('created_at')), // 表对应的字段
              Sequelize.literal('CURRENT_DATE')
            )
          ]
        },
        defaults: params,
        fields: [
          'totalMoney',
          'personNum',
          'cashMoney',
          'paidMoney',
          'paidDesc',
          'placeId',
          "createdAt"
        ]
      })
      console.log(finance.toJSON())
      if (!created) {
        return this.error(null, '当天账目已存在！')
      }
      return this.success(finance, '添加成功')
    } catch (e) {
      console.log('e---', e)
      return e
    }

  }

  async update(id, placeId, body) {
    const { ctx, app } = this
    const finance = await ctx.model.Finance.findByPk(id)
    if (finance) {
      await finance.update(body, {
        fields: [
          'totalMoney',
          'personNum',
          'cashMoney',
          'paidMoney',
          'paidDesc',
          'placeId']
      })
      return this.success(finance, '修改成功')
    }
    return this.error(null, '没有查询到当前数据，无法修改')
  }

  async destroy() {
    const { ctx } = this
    const finance = await ctx.model.Finance.findByPk(ctx.params.id)
    if (finance) {
      await finance.destroy()
      return this.success(null, '删除成功')
    }
    return this.error(null, '删除失败，没有当前数据')
  }
}

module.exports = FinanceService
