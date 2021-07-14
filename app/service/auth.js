'use strict'

const CommenService = require('./common')

class AuthService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Auth.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const auth = await ctx.model.Auth.findByPk(id)
    if (auth) {
      return this.success(auth, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { authName = '', authCode } = body
    const where = {
      authName,
      authCode
    }
    const [auth, created] = await ctx.model.Auth.findOrCreate({
      where,
      defaults: body,
      fields: ['authName', 'authCode', 'authFlag', 'desc']
    })
    if (!created) {
      return this.error(null, '权限名称或编码已存在！')
    }
    return this.success(auth, '权限创建成功！')
  }
  async update(id, body) {
    const { ctx, app } = this
    const { authName, authCode } = body
    const where = {
      authName,
      authCode
    }
    const auth = await ctx.model.Auth.findByPk(id)
    if (auth) {
      const hasAuth = await ctx.model.Auth.findOne({
        where
      })
      if (hasAuth && hasAuth.id !== id) {
        return this.error(null, '权限名称或编码已存在！')
      }
      await auth.update(body, {
        fields: ['authName', 'authCode', 'authFlag', 'desc']
      })
      return this.success(auth, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy(authId) {
    const { ctx } = this
    const roleAuth = await ctx.model.RoleAuth.findOne({
      where: {
        authId
      }
    })
    if (roleAuth) {
      return this.error(null, '请解除权限，再进行删除！')
    }
    const auth = await ctx.model.Auth.findByPk(authId)
    if (auth) {
      await auth.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
  async getAllAuth() {
    const { ctx } = this
    const list = await ctx.model.Auth.findAll({
      where: {
        authFlag: '-1'
      },
      attributes: [
        ['id', 'value'],
        ['auth_name', 'label']
      ]
    })
    return this.success(list, null)
  }
}

module.exports = AuthService
