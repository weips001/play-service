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
      const currentDate = params.createdAt ? params.createdAt : Sequelize.literal('CURRENT_DATE')
      const [finance, created] = await ctx.model.Finance.findOrCreate({
        where: {
          [Op.and]: [
            where(
              Sequelize.fn('DATE', Sequelize.col('created_at')), // 表对应的字段
              currentDate
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
        return this.error(null, '所选日期账目已存在！')
      }
      return this.success(finance, '添加成功')
    } catch (e) {
      return Promise.reject(e)
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
  async getFinanceByDate(placeId, body) {
    const { ctx } = this
    const { startDate = new Date(), endDate = new Date() } = body
    const sql = `SELECT
      SUM( total_money ) AS totalMoney,
      SUM( person_num ) AS personNum,
      SUM( paid_money ) AS paidMoney 
    FROM
      finance 
    WHERE
      place_id = :placeId 
      AND DATE_FORMAT( created_at, '%Y-%m-%d' ) >= DATE_FORMAT( :startDate, '%Y-%m-%d' )
      AND DATE_FORMAT( created_at, '%Y-%m-%d' ) <= DATE_FORMAT( :endDate, '%Y-%m-%d' );`
    const res = await ctx.model.query(sql, {
      replacements: {
        placeId,
        startDate,
        endDate
      },
      type: 'SELECT',
      plain: true
    })
    return this.success(res, '查询成功！')
  }
}

module.exports = FinanceService
