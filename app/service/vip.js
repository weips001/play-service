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
    try {
      const [vip, created] = await ctx.model.Vip.findOrCreate({
        where: {
          phone: params.phone
        },
        defaults: params,
        fields: [
          'name',
          'phone',
          'remark',
          'sex',
          'birthday',
          'placeId',
          'createdAt'
        ]
      })
      // console.log(vip.toJSON())
      if (!created) {
        return this.error(null, '会员手机号已存在！')
      }
      return this.success(vip, '添加成功')
    } catch (e) {
      console.log('e---', e)
      return e
    }

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
          [Op.or]: [
            {
              [Op.gt]: new Date()
            },
            {
              [Op.eq]: null
            }
          ]

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
  async getDetailByPhone(phone) {
    const { ctx } = this
    const vip = await ctx.model.Vip.findOne({
      where: {
        phone
      }
    })
    if (vip) {
      return this.success(vip, '获取详情成功')
    }
    return this.error(null, '无当前数据，获取详情失败')
  }
  // 导入充值数据
  async importRechargeInfo(ctx, placeId) {
    const res = await ctx.http.get(`http://39.99.228.79:7006/api/vipBuyRecord?current=1&pageSize=5000`)

    const { data, code } = res
    let successNum = 0
    let errNum = 0
    if (code === 0) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        const { money, isYearCard, restTotal, usedTotal, total, createTime, cardId, cardType, overdate } = item
        // console.log(item)
        const vip = await ctx.model.Vip.findOne({
          where: {
            phone: item.phone
          }
        })
        if (vip) {
          const values = {
            money,
            isYearCard,
            restTotal,
            usedTotal,
            total,
            createdAt: createTime,
            cardId,
            cardType,
            overdate,
            vipId: vip.id,

          }
          const res = await ctx.service.taoRecharge.create(placeId, values)
          if (res.code === 0) {
            successNum++
          } else {
            errNum++
          }
        }
        const re = Math.floor((successNum + errNum) / data.length * 100) + '%'
        console.log(re)

      }
      console.log(successNum, errNum)
    }
  }
  // 导入消费记录
  async importRecordInfo(ctx, placeId) {
    const res = await ctx.http.get(`http://39.99.228.79:7006/api/shoppingRecord?current=1&pageSize=50000`)

    const { data, code } = res
    let successNum = 0
    let errNum = 0
    let noPhone = 0
    let noVip = 0
    if (code === 0) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        const { consumeTime, cardId, cardType, phone, shoppingNum } = item
        // console.log(item)
        // if (!phone || !cardType) {
        //   const {data, code} = await ctx.http.get(`http://39.99.228.79:7006/api/vipBuyRecord?current=1&pageSize=5000?cardId=${cardId}`)
        //   data.filter(item => )
        // }
        if (phone) {
          try {
            const vip = await ctx.model.Vip.findOne({
              where: {
                phone
              }
            })
            if (vip) {
              const values = {
                placeId,
                createdAt: consumeTime,
                cardId,
                cardType,
                consumeNum: shoppingNum,
                vipId: vip.id,

              }
              const res = await ctx.model.TaoRecord.saveRecord(values)
              if (res) {
                successNum++
              } else {
                errNum++
              }
            } else {
              ctx.logger.info('noVip---', JSON.stringify(item))
              noVip++
            }

          } catch (e) {
            console.log(e)
            errNum++
          }
        } else {
          noPhone++
          ctx.logger.info('cardId---', item.cardId)
        }

        const re = Math.floor((successNum + errNum + noPhone + noVip) / data.length * 100) + '%'
        console.log(re)

      }
      console.log(successNum, errNum, noPhone, noVip)
    }
  }
  async changeCardType() {
    const { ctx } = this
    let changeNum = 0
    try {
      const res = await ctx.http.get(`http://39.99.228.79:7006/api/vipBuyRecord?current=1&pageSize=5000`)
      const { code, data } = res
      if (code === 0) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          if (item.cardId != undefined) {
            const list = await ctx.model.TaoRecord.findAll({
              where: {
                cardId: item.cardId
              }
            })
            for (let j = 0; j < list.length; j++) {
              const li = list[j]
              if (li.cardType == undefined) {
                li.cardType = item.cardType
                const liRes = await li.save()
                if (liRes) {
                  changeNum++
                }
              }
            }
          }
          const re = Math.floor(changeNum / 24866 * 100) + '%'
          console.log(re)
        }
        console.log('changeNum', changeNum)
      }
    } catch (e) {
      console.log(e)
    }
  }
  async updateTime(placeId, body) {
    const { ctx } = this
    // this.importRechargeInfo(ctx, placeId)
    // await this.importRecordInfo(ctx, placeId)
    await this.changeCardType()
  }
}

module.exports = VipService
