'use strict'

const CommenService = require('./common')

class TaoRechargeService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { limit, offset, phone, name, cardId, cardType, restTotal } = query
    const suffix = ' ORDER BY t.created_at DESC LIMIT ?,?'
    let querySql = `SELECT t.*, v.name, v.phone, v.sex, v.birthday FROM tao_recharge t LEFT JOIN vip v ON t.vip_id = v.id where 1=1`
    let whereStr = ''
    let countSql =
      'SELECT COUNT(*) AS total FROM tao_recharge t LEFT JOIN vip v ON t.vip_id = v.id where 1=1'
    let replacements = []
    if (name != undefined) {
      whereStr += ` AND v.name LIKE ? `
      replacements.push(`%${name}%`)
    }
    if (phone != undefined) {
      whereStr += ` AND v.phone LIKE ? `
      replacements.push(`%${phone}%`)
    }
    if (cardId != undefined) {
      whereStr += ` AND t.card_id LIKE ? `
      replacements.push(`%${cardId}%`)
    }
    if (cardType != undefined) {
      whereStr += ` AND t.card_type = ? `
      replacements.push(cardType)
    }
    if (restTotal != undefined) {
      whereStr += ` AND t.rest_total = ? `
      replacements.unshift(restTotal)
    }
    countSql = countSql + whereStr
    querySql = querySql + whereStr + suffix
    replacements.push(offset, limit)
    const rows = await ctx.model.query(querySql, {
      replacements,
      type: 'SELECT',
      model: ctx.model.TaoRecharge,
      mapToModel: true
    })
    const { total } = await ctx.model.query(countSql, {
      replacements,
      type: 'SELECT',
      plain: true
    })
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const taoRecharge = await ctx.model.TaoRecharge.findByPk(id)
    if (taoRecharge) {
      return this.success(taoRecharge, '获取详情成功')
    }
    return this.error(null, '无当前数据，获取详情失败')
  }
  // 新建和充值的接口，根据手机号判断是否有当前会员，如果有直接绑定，如果没有就创建，再生成一条充值记录
  async create(placeId, body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const t = await ctx.model.transaction()
    try {
      const params = {
        ...body,
        placeId
      }
      const [vip] = await ctx.model.Vip.findOrCreate({
        where: {
          phone: params.phone
        },
        defaults: params,
        fields: ['name', 'phone', 'remark', 'sex', 'birthday', 'placeId'],
        transaction: t
      })
      if (vip) {
        params.vipId = vip.id
      }
      console.log(ctx.model)
      await ctx.model.TaoRecharge.create(params, {
        fields: [
          'isYearCard',
          'cardId',
          'cardType',
          'money',
          'total',
          'restTotal',
          'usedTotal',
          'remark',
          'overdate',
          'vipId',
          'placeId',
          'createdAt'
        ],
        transaction: t
      })
      await t.commit()
      return this.success(null, '充值成功')
    } catch (e) {
      console.log('充值失败', e)
      await t.rollback()
      return this.error(null, '充值失败')
    }
  }

  async update(id, placeId, body) {
    const { ctx, app } = this
    const taoRecharge = await ctx.model.TaoRecharge.findByPk(id)
    if (taoRecharge) {
      await taoRecharge.update(body, {
        fields: ['name', 'phone', 'remark', 'sex']
      })
      return this.success(taoRecharge, '修改成功')
    }
    return this.error(null, '没有查询到当前数据，无法修改')
  }

  async consume(id, consumeNum) {
    const { ctx } = this
    const t = await ctx.model.transaction()
    try {
      const taoRecharge = await ctx.model.TaoRecharge.findByPk(id, {
        transaction: t
      })
      console.log(taoRecharge.toJSON())
      if (taoRecharge) {
        const {
          cardType,
          overdate,
          restTotal,
          cardId,
          vipId,
          placeId
        } = taoRecharge
        const taoRecordValue = {
          consumeNum,
          cardType,
          cardId,
          vipId,
          placeId
        }
        // 判斷是否是年卡
        if (cardType === '1') {
          // 判斷是否過期
          if (overdate) {
            const canConsume = new Date(overdate) > new Date()
            if (canConsume) {
              // TODO: 這裡要增加當天是否已消費的判斷
              const incrementResult = await taoRecharge.increment('usedTotal', {
                transaction: t
              })
              await ctx.model.TaoRecord.saveRecord(taoRecordValue, t)
              await t.commit()
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
          await taoRecharge.increment('usedTotal', { by: consumeNum })
          await taoRecharge.decrement('restTotal', { by: consumeNum })
          await ctx.model.TaoRecord.saveRecord(taoRecordValue, t)
          await t.commit()
          // TODO:需要写入一条消费记录
          console.log(taoRecharge.toJSON())
          return this.success(null, `消费成功，次数：${consumeNum} 次`)
        }
        return this.error(null, '会员卡已过期，不能消费')
      }
      return this.error(null, '沒有此會員無法消費')
    } catch (e) {
      await t.rollback()
      return this.error(e, '消費失敗')
    }
  }

  async destroy() {
    const { ctx } = this
    const taoRecharge = await ctx.model.TaoRecharge.findByPk(ctx.params.id)
    if (taoRecharge) {
      await taoRecharge.destroy()
      return this.success(null, '删除成功')
    }
    return this.error(null, '删除失败，没有当前数据')
  }
  async getTaoRecharge(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.TaoRecharge.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true
    }
  }
}

module.exports = TaoRechargeService
