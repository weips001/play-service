'use strict'
const uuid = require('uuid').v4
module.exports = app => {
  const { STRING, FLOAT, DATE, UUID } = app.Sequelize
  const Finance = app.model.define('finance', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    totalMoney: {
      type: FLOAT,
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
      type: FLOAT,
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
      type: FLOAT,
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
      type: FLOAT,
      allowNull: false,
      field: 'paid_money',
      comment: '支出金额',
      validate: {
        notEmpty: {
          msg: '支出金额不能為空'
        },
      }
    },
    paidDesc: {
      type: STRING(300),
      comment: '支出描述',
      field: 'paid_desc',
      validate: {
        checkDesc(value) {
          if (this.paidMoney > 0) {
            if (value == undefined || !value) {
              throw new Error("当有支出金额时，描述不能为空")
            }
          }
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
