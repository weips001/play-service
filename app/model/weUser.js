'use strict'
const uuid = require('uuid').v4
const md5 = require('md5-node')
module.exports = app => {
  const { STRING, BOOLEAN, DATE, UUID } = app.Sequelize
  const WeUser = app.model.define('weUser', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    weName: {
      type: STRING(30),
      field: 'we_name',
      comment: '微信昵称'
    },
    avatar: {
      type: STRING(30),
      comment: '微信头像'
    },
    openId: {
      type: STRING(30),
      field: 'open_id',
      comment: '微信用户的唯一标识',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'openid不能為空'
        }
      }
    },
    isVip: {
      type: BOOLEAN,
      field: 'is_vip',
      comment: '是否是vip',
      defaultValue: false
    },
    userId: {
      type: UUID,
      field: 'user_id',
      comment: 'pc用户id'
    },
    overdue: {
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否过期'
    },
    phone: {
      type: STRING(11),
      allowNull: false,
      validate: {
        is: {
          args: /^[1][0-9]{10}$/,
          msg: '手机格式不正确'
        }
      }
    }
  })

  return WeUser
}
