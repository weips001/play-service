'use strict'

const CommenService = require('./common')

class PlaceService extends CommenService {
  async list(query) {
    const { ctx } = this
    const { count, rows } = await ctx.model.Place.findAndCountAll(query)
    const res = this.success(rows, '查询成功！')
    return {
      ...res,
      total: count,
      success: true
    }
  }

  async detail(id) {
    const { ctx } = this
    const place = await ctx.model.Place.findByPk(id)
    if (place) {
      return this.success(place, '获取详情成功！')
    }
    return this.error(null, '无当前数据，获取详情失败！')
  }

  async create(body) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const { placeName = '' } = body
    const t = await ctx.model.transaction()
    try {
      // 1. 创建驾校
      const [place, created] = await ctx.model.Place.findOrCreate({
        where: {
          placeName
        },
        defaults: body,
        fields: [
          'placeName',
          'placeLoaction',
          'adminName',
          'adminPhone',
          'perioOfValidity',
          'desc'
        ],
        transaction: t
      })
      if (!created) {
        return this.error(null, '驾校名称已存在！')
      }
      // 2. 创建驾校管理员
      const adminUser = {
        placeId: place.id,
        name: place.adminName,
        phone: place.adminPhone
      }
      const [user] = await ctx.model.User.findOrCreate({
        where: {
          phone: place.adminPhone
        },
        defaults: adminUser,
        transaction: t
      })
      // 3. 创建管理员角色
      const adminRole = {
        roleName: '管理员',
        desc: '拥有全部权限，不可删除',
        placeId: place.id,
        roleCode: '-1'
      }
      const [role] = await ctx.model.Role.findOrCreate({
        where: {
          roleName: '管理员',
          placeId: place.id,
          roleCode: '-1'
        },
        defaults: adminRole,
        transaction: t
      })
      // 4. 查询所有的权限
      let authIds = await ctx.model.Auth.findAll({
        where: {
          authFlag: '-1'
        },
        attributes: ['id']
      })
      const roleParams = authIds.map(auth => {
        return {
          roleId: role.id,
          authId: auth.id,
          placeId: place.id
        }
      })
      // 5. 给角色绑定权限
      await ctx.model.RoleAuth.bulkCreate(roleParams, {
        validate: true,
        transaction: t
      })
      // 6. 给人员绑定角色
      await ctx.model.UserRole.create(
        {
          roleId: role.id,
          placeId: place.id,
          userId: user.id
        },
        { transaction: t }
      )
      await t.commit()
      return this.success(place, '驾校创建成功')
    } catch (e) {
      console.log(e, e)
      await t.rollback()
      return this.error(e, '驾校创建失败！')
    }
  }
  async update(id, body) {
    const { ctx, app } = this
    const { placeName } = body
    const place = await ctx.model.Place.findByPk(id)
    if (place) {
      const hasPlace = await ctx.model.Place.findOne({
        where: { placeName }
      })
      if (hasPlace && hasPlace.id !== id) {
        return this.error(null, '驾校名称已存在！')
      }
      await place.update(body, {
        fields: [
          'placeName',
          'placeLoaction',
          'adminName',
          'adminPhone',
          'desc'
        ]
      })
      console.log(place.toJSON())
      return this.success(place, '修改成功！')
    }
    return this.error(null, '没有查询到当前数据，无法修改！')
  }
  async destroy() {
    const { ctx } = this
    const place = await ctx.model.Place.findByPk(ctx.params.id)
    if (place) {
      await place.destroy()
      return this.success(null, '删除成功！')
    }
    return this.error(null, '删除失败，没有当前数据！')
  }
}

module.exports = PlaceService
