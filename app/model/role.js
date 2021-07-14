'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, VIRTUAL, DATE, UUID } = app.Sequelize
  const Role = app.model.define('role', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    roleName: {
      type: STRING(100),
      allowNull: false,
      field: 'role_name',
      comment: '角色名称',
      validate: {
        notEmpty: {
          msg: '角色名称不能為空'
        }
      }
    },
    roleCode: {
      type: STRING(50),
      allowNull: false,
      field: 'role_code',
      comment: '角色编码',
      validate: {
        notEmpty: {
          msg: '角色编码不能為空'
        }
      }
    },
    placeId: {
      type: UUID,
      field: 'place_id',
      comment: '驾校id',
      allowNull: false,
      validate: {
        len: {
          args: [32, 32],
          msg: '无效的驾校id'
        },
        notEmpty: {
          msg: '驾校id不能為空'
        }
      }
    },
    desc: {
      type: STRING(300),
      comment: '角色描述',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '角色描述不能為空'
        }
      }
    }
  })
  Role.getRoleCodes = async function(placeId, roleId) {
    if (!roleId) throw new Error('roleId is empty!')
    if (typeof roleId === 'string') {
      roleId = [roleId]
    }
    let roleCodes = await app.model.query(
      'SELECT DISTINCT r.role_code AS roleCode FROM role r LEFT JOIN user_role ur ON r.id = ur.role_id WHERE r.id IN(:roleId) AND r.place_id = :placeId',
      {
        type: 'SELECT',
        replacements: {
          placeId,
          roleId
        }
      }
    )
    roleCodes = roleCodes.map(role => role.roleCode)
    return roleCodes
  }
  return Role
}
