'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, BOOLEAN } = app.Sequelize
  const Vip = app.model.define('vip', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    name: {
      type: STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '姓名不能為空'
        }
      }
    },
    phone: {
      type: STRING(12),
      allowNull: false,
      validate: {
        // is: {
        //   args: /^[1][0-9]{10}$/,
        //   msg: '手机格式不正确'
        // }
      }
    },
    remark: {
      type: STRING(255)
    },
    sex: {
      type: STRING(1),
      allowNull: false,
      comment: '性别，0男 1女',
      validate: {
        notEmpty: {
          msg: '性别类型不能為空'
        },
        isIn: {
          args: [['0', '1']],
          msg: '请选择正确的性别'
        }
      }
    },
    birthday: {
      type: DATE,
      allowNull: false,
      comment: '生日',
      validate: {
        notEmpty: {
          msg: '生日不能為空'
        }
      }
    },
    // TODO:暂时没有校验
    placeId: {
      type: UUID,
      field: 'place_id',
      comment: '场地id',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '场地id不能為空'
        }
      }
    }
  })

  return Vip
}
