'use strict'

const CommenService = require('./common')

class RoleAuthService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.RoleAuth.findAndCountAll(query)
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
    const roleAuth = await ctx.model.RoleAuth.findByPk(id)
    if (roleAuth) {
      return this.success(roleAuth, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(placeId, body) {
    if (!placeId) {
      return this.error('当前用户没有绑定驾校，无法操作！')
    }
    const { ctx, app } = this
    const { roleId, authId } = body
    const [roleAuth, created] = await ctx.model.RoleAuth.findOrCreate({
      where: {
        roleId,
        placeId,
        authId
      },
      defaults: body,
      fields: ['roleId', 'placeId', 'authId']
    })
    if (!created) {
      return this.error(null, '当前角色已绑定！')
    }
    return this.success(roleAuth, '角色绑定成功！')
  }
  async update(id, placeId, body) {
    const { ctx, app } = this
    const { roleId, authId } = body
    const roleAuth = await ctx.model.RoleAuth.findByPk(id)
    if (roleAuth) {
      const hasRoleAuth = await ctx.model.RoleAuth.findOne({
        where: {
          roleId,
          placeId,
          authId
        }
      })
      if (hasRoleAuth && hasRoleAuth.id !== id) {
        return this.error(null, '角色已绑定！')
      }
      await roleAuth.update(body, {
        fields: ['roleId', 'authId']
      })
      console.log(roleAuth.toJSON())
      return this.success(roleAuth, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const roleAuth = await ctx.model.RoleAuth.findByPk(ctx.params.id)
    if (roleAuth) {
      await roleAuth.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
  async bindAuth(placeId, body) {
    const { ctx } = this
    const t = await ctx.model.transaction()
    try {
      const { roleId, auth } = body
      await ctx.model.query(
        'DELETE ra FROM role_auth ra WHERE ra.place_id = :placeId AND ra.role_id = :roleId',
        {
          type: 'DELETE',
          replacements: {
            placeId,
            roleId
          },
          transaction: t
        }
      )
      if (auth.length > 0) {
        const authParams = []
        auth.forEach(item => {
          authParams.push({
            roleId,
            placeId,
            authId: item
          })
        })
        await ctx.model.RoleAuth.bulkCreate(authParams, {
          validate: true,
          transaction: t
        })
      }
      await t.commit()
      return this.success(null, '权限绑定成功！')
    } catch (e) {
      await t.rollback()
      console.log('e', e)
      return this.error(null, '权限绑定失败！')
    }
  }
  async getAuthFromRole(placeId, roleId) {
    const { ctx } = this
    let authIds = await ctx.model.RoleAuth.findAll({
      where: {
        placeId,
        roleId
      },
      attributes: ['authId']
    })
    authIds = authIds.map(item => item.authId)
    return this.success(authIds, null)
  }
}

module.exports = RoleAuthService
