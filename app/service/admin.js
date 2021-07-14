'use strict'

const CommenService = require('./common')

class AdminService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Admin.findAndCountAll(query)
    const result = {
      total: count,
      list: rows
    }
    const res = this.success(result, '查询成功！')
    return {
      ...res,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const admin = await ctx.model.Admin.findByPk(id)
    if (admin) {
      return this.success(admin, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { phone = '', name = '' } = body
    const [admin, created] = await ctx.model.Admin.findOrCreate({
      where: {
        [Op.or]: [{ name }, { phone }]
      },
      defaults: {
        name,
        phone
      }
    })
    if (!created) {
      return this.error(null, '用户名或者手机号已存在！')
    }
    return this.success(admin, '新增管理员成功！')
  }
  async update(id, body) {
    const { ctx, app } = this
    const admin = await ctx.model.Admin.findByPk(id)
    if (admin) {
      const hasAdmin = await ctx.model.Admin.findOne({
        where: {
          [Op.or]: [{ name: body.name }, { phone: body.phone }]
        }
      })
      if (hasAdmin && hasAdmin.id !== id) {
        return this.error(null, '用户名或者手机号已存在！')
      }
      await admin.update(body, {
        fields: ['name', 'phone']
      })
      console.log(admin.toJSON())
      return this.success(admin, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const admin = await ctx.model.Admin.findByPk(ctx.params.id)
    if (admin) {
      await admin.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
}

module.exports = AdminService
