'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize
  const Finance = app.model.define('finance', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    totalMoney: {
      type: INTEGER,
      allowNull: false,
      field: 'total_money',
      comment: '总收入',
      validate: {
        notEmpty: {
          msg: '总收入不能为空'
        }
      }
    },
    personNum: {
      type: INTEGER,
      allowNull: false,
      field: 'person_num',
      comment: '人数',
      validate: {
        notEmpty: {
          msg: '人数不能為空'
        }
      }
    },
    cashMoney: {
      type: INTEGER,
      allowNull: false,
      field: 'cash_money',
      comment: '钱柜金额',
      validate: {
        notEmpty: {
          msg: '钱柜金额不能為空'
        }
      }
    },
    paidMoney: {
      type: INTEGER,
      allowNull: false,
      field: 'paid_money',
      comment: '支出金额',
      validate: {
        notEmpty: {
          msg: '支出金额不能為空'
        }
      }
    },
    paidDesc: {
      type: STRING(300),
      comment: '角色描述',
      field: 'paid_desc',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '角色描述不能為空'
        }
      }
    },
    placeId: {
      type: UUID,
      field: 'place_id',
      comment: '场地id',
      allowNull: false,
      validate: {
        // len: {
        //   args: [32, 32],
        //   msg: '无效的场地id'
        // },
        notEmpty: {
          msg: '场地id不能為空'
        }
      }
    }
  })
  return Finance
}
