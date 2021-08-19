'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, BOOLEAN } = app.Sequelize
  const TaoRecharge = app.model.define('tao_recharge', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
    },
    isYearCard: {
      type: BOOLEAN,
      field: 'is_year_card',
      defaultValue: false
    },
    cardId: {
      type: STRING(20),
      allowNull: false,
      field: 'card_id',
      comment: '卡号',
      validate: {
        notEmpty: {
          msg: '卡号不能為空'
        }
      }
    },
    cardType: {
      type: STRING(2),
      allowNull: false,
      field: 'card_type',
      comment: '会员卡类型，0次卡 1时间卡',
      validate: {
        notEmpty: {
          msg: '会员卡类型不能為空'
        },
        isIn: {
          args: [['0', '1']],
          msg: '无当前会员卡类型'
        }
      }
    },
    money: {
      type: INTEGER,
      allowNull: false,
      comment: '会员卡金额',
      validate: {
        notEmpty: {
          msg: '会员卡金额不能為空'
        }
      }
    },
    total: {
      type: INTEGER,
      allowNull: false,
      comment: '会员卡总次数',
      validate: {
        notEmpty: {
          msg: '会员卡总次数不能為空'
        }
      }
    },
    restTotal: {
      type: INTEGER,
      allowNull: false,
      field: 'rest_total',
      comment: '会员卡剩余次数',
      validate: {
        notEmpty: {
          msg: '会员卡剩余次数不能為空'
        }
      }
    },
    usedTotal: {
      type: INTEGER,
      field: 'used_total',
      comment: '会员卡已使用次数',
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: '会员卡已使用次数不能為空'
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

  return TaoRecharge
}
