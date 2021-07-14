'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, VIRTUAL, DATE, UUID } = app.Sequelize
  const Place = app.model.define('place', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    placeName: {
      type: STRING(100),
      allowNull: false,
      field: 'place_name',
      comment: '驾校名称',
      validate: {
        notEmpty: {
          msg: '驾校名称不能為空'
        }
      }
    },
    placeLoaction: {
      type: STRING(120),
      allowNull: false,
      field: 'place_loaction',
      comment: '驾校位置',
      validate: {
        notEmpty: {
          msg: '驾校位置不能為空'
        }
      }
    },
    adminName: {
      type: STRING(30),
      allowNull: false,
      comment: '驾校管理员姓名',
      validate: {
        notEmpty: {
          msg: '驾校管理员姓名不能為空'
        }
      }
    },
    adminPhone: {
      type: STRING(11),
      allowNull: false,
      comment: '驾校管理员手机号',
      validate: {
        is: {
          args: /^[1][0-9]{10}$/,
          msg: '手机格式不正确'
        }
      }
    },
    perioOfValidity: {
      type: DATE,
      allowNull: false,
      field: 'over_date',
      comment: '过期时间',
      validate: {
        notEmpty: {
          msg: '过期时间不能为空'
        }
      }
    },
    // 虚拟值，是否过期
    isDelay: {
      type: VIRTUAL,
      get() {
        return new Date(this.perioOfValidity) < new Date()
      },
      set() {
        throw new Error('不要尝试设置 `isDelay` 的值!')
      }
    },
    desc: {
      type: STRING(300),
      comment: '驾校描述'
    }
  })
  return Place
}
