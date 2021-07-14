'use strict'

const CommenService = require('./common')

class UserRoleService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.UserRole.findAndCountAll(query)
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
    const roleAuth = await ctx.model.UserRole.findByPk(id)
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
    const { roleId, userId } = body
    const [roleAuth, created] = await ctx.model.UserRole.findOrCreate({
      where: {
        roleId,
        placeId,
        userId
      },
      defaults: body,
      fields: ['roleId', 'placeId', 'userId']
    })
    if (!created) {
      return this.error(null, '当前角色已绑定！')
    }
    return this.success(roleAuth, '角色绑定成功！')
  }
  async update(id, placeId, body) {
    const { ctx, app } = this
    const { roleId, userId } = body
    const roleAuth = await ctx.model.UserRole.findByPk(id)
    if (roleAuth) {
      const hasUserRole = await ctx.model.UserRole.findOne({
        where: {
          roleId,
          placeId,
          userId
        }
      })
      if (hasUserRole && hasUserRole.id !== id) {
        return this.error(null, '角色已绑定！')
      }
      await roleAuth.update(body, {
        fields: ['roleId', 'userId']
      })
      console.log(roleAuth.toJSON())
      return this.success(roleAuth, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const roleAuth = await ctx.model.UserRole.findByPk(ctx.params.id)
    if (roleAuth) {
      await roleAuth.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
  async bindRole(placeId, body) {
    const { ctx } = this
    const t = await ctx.model.transaction()
    try {
      const { userId, role } = body
      await ctx.model.query(
        'DELETE ur FROM user_role ur WHERE ur.place_id = :placeId AND ur.user_id = :userId',
        {
          type: 'DELETE',
          replacements: {
            placeId,
            userId
          },
          transaction: t
        }
      )
      if (role.length > 0) {
        const roleParams = []
        role.forEach(item => {
          roleParams.push({
            roleId: item,
            placeId,
            userId
          })
        })
        await ctx.model.UserRole.bulkCreate(roleParams, {
          validate: true,
          transaction: t
        })
      }
      await t.commit()
      return this.success(null, '角色绑定成功！')
    } catch (e) {
      await t.rollback()
      console.log('e', e)
      return this.error(null, '角色绑定失败！')
    }
  }
  async getRoleIdsByUser(placeId, userId) {
    const { ctx } = this
    let roleIds = await ctx.model.UserRole.findAll({
      where: {
        placeId,
        userId
      },
      attributes: ['roleId']
    })
    roleIds = roleIds.map(item => item.roleId)
    return this.success(roleIds, null)
  }
}

module.exports = UserRoleService
