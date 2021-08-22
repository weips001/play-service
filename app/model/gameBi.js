'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, VIRTUAL } = app.Sequelize
  const GameBi = app.model.define('gamebi', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    money: {
      type: INTEGER,
      allowNull: false,
      comment: '充值金额',
      validate: {
        notEmpty: {
          msg: '充值金额不能為空'
        }
      }
    },
    baseTotal: {
      type: INTEGER,
      allowNull: false,
      field: 'base_total',
      comment: '基础游戏币个数',
      validate: {
        notEmpty: {
          msg: '基础游戏币个数不能為空'
        }
      }
    },
    freeTotal: {
      type: INTEGER,
      allowNull: false,
      field: 'free_total',
      comment: '赠送游戏币个数',
      defaultValue: 0
    },
    total: {
      type: VIRTUAL,
      get() {
        return this.baseTotal + this.freeTotal;
      },
      set() {
        throw new Error('不要尝试设置 `total` 的值!');
      }
    },
    restTotal: {
      type: INTEGER,
      allowNull: false,
      field: 'rest_total',
      comment: '剩余个数',
      validate: {
        notEmpty: {
          msg: '剩余个数不能為空'
        }
      }
    },
    usedTotal: {
      type: INTEGER,
      field: 'used_total',
      comment: '已经使用的个数',
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: '已经使用的个数不能為空'
        }
      }
    },
    remark: {
      type: STRING(255)
    },
    // TODO:暂时没有校验
    overdate: {
      type: DATE,
      allowNull: true,
      comment: '过期时间'
    },
    vipId: {
      type: UUID,
      field: 'vip_id',
      comment: '会员的id',
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '会员的id不能為空'
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

  return GameBi
}
