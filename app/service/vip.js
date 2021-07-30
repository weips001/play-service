'use strict'

const CommenService = require('./common')

class VipService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Vip.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const vip = await ctx.model.Vip.findByPk(id)
    if (vip) {
      return this.success(vip, '获取详情成功')
    }
    return this.error(null, '无当前数据，获取详情失败')
  }

  async create(placeId, body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const params = {
      ...body,
      placeId
    }
    const vip = await ctx.model.Vip.create(params, {
      fields: [
        'name',
        'phone',
        'isYearCard',
        'cardId',
        'cardType',
        'money',
        'total',
        'restTotal',
        'usedTotal',
        'remark',
        'sex',
        'birthday',
        'overdate',
        'placeId',
        'createdAt'
      ]
    })
    if (!vip) {
      return this.error(null, '充值失败')
    }
    return this.success(vip, '充值成功')
  }

  async update(id, placeId, body) {
    const { ctx, app } = this
    const vip = await ctx.model.Vip.findByPk(id)
    if (vip) {
      await vip.update(body, {
        fields: ['name', 'phone', 'remark', 'sex']
      })
      return this.success(vip, '修改成功')
    }
    return this.error(null, '没有查询到当前数据，无法修改')
  }

  async consume(id, consumeNum) {
    const { ctx } = this
    const vip = await ctx.model.Vip.findByPk(id)
    if (vip) {
      const { cardType, overdate, restTotal } = vip
      // 判斷是否是年卡
      if (cardType === '1') {
        // 判斷是否過期
        if (overdate) {
          const canConsume = new Date(overdate) > new Date()
          if (canConsume) {
            // TODO: 這裡要增加當天是否已消費的判斷
            const incrementResult = await vip.increment('usedTotal')
            console.log(incrementResult)
            // TODO:需要写入一条消费记录
            return this.success(null, '消费成功，次数：1 次')
          }
          return this.error(null, '会员卡已过期，不能消费')
        }
        return this.error(null, '次卡无过期时间，不能消费')
      }
      // 次卡，因之前的次卡没有过期时间，这里先判断是否有过期时间
      let conConsume = true
      if (overdate) {
        conConsume = new Date(overdate) > new Date()
      }
      if (conConsume) {
        let diff = restTotal - consumeNum
        if (diff < 0) {
          return this.error(null, '次数不够用了，请充值')
        }
        await vip.increment('usedTotal', { by: consumeNum })
        await vip.decrement('restTotal', { by: consumeNum })
        // TODO:需要写入一条消费记录
        console.log(vip.toJSON())
        return this.success(null, `消费成功，次数：${consumeNum} 次`)
      }
      return this.error(null, '会员卡已过期，不能消费')
    }
    return this.error(null, '沒有此會員無法消費')
  }

  async destroy() {
    const vip = await ctx.model.Vip.findByPk(ctx.params.id)
    if (vip) {
      await vip.destroy()
      return this.success(null, '删除成功')
    }
    return this.error(null, '删除失败，没有当前数据')
  }
  async getVipRecord(placeId, vipId) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const getTaoConsume = ctx.model.TaoRecharge.findAll({
      where: {
        placeId,
        vipId,
        restTotal: {
          [Op.or]: [
            {
              [Op.gt]: 0
            },
            {
              [Op.eq]: -1
            }
          ]
        },
        overdate: {
          [Op.gt]: new Date()
        }
      },
      order: [['createdAt', 'ASC']]
    })
    const getTaoRecharge = ctx.model.TaoRecharge.findAll({
      where: {
        placeId,
        vipId
      },
      order: [['createdAt', 'DESC']]
    })
    const getTaoRecord = ctx.model.TaoRecord.findAll({
      where: {
        placeId,
        vipId
      },
      order: [['createdAt', 'DESC']]
    })
    const [consumeList, rechargeRecord, consumeRecord] = await Promise.all([
      getTaoConsume,
      getTaoRecharge,
      getTaoRecord
    ])
    const values = {
      consumeList,
      rechargeRecord,
      consumeRecord
    }
    return this.success(values, null)
  }
}

module.exports = VipService
