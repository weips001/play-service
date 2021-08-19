'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, BOOLEAN } = app.Sequelize
  const TaoRecord = app.model.define('tao_record', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuid().replace(/-/g, '')
      }
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
    consumeNum: {
      type: INTEGER,
      allowNull: false,
      field: 'consume_num',
      comment: '消費次數',
      validate: {
        notEmpty: {
          msg: '消費次數不能為空'
        }
      }
    },
    cardType: {
      type: STRING(2),
      allowNull: true,
      field: 'card_type',
      comment: '会员卡类型，0次卡 1时间卡',
      validate: {
        // notEmpty: {
        //   msg: '会员卡类型不能為空'
        // },
        isIn: {
          args: [['0', '1']],
          msg: '无当前会员卡类型'
        }
      }
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
    remark: {
      type: STRING(255)
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
  TaoRecord.saveRecord = async function (data, t) {
    const options = {
      fields: ['cardId', 'consumeNum', 'cardType', 'remark', 'vipId', 'placeId', 'createdAt']
    }
    if (t) {
      options.transaction = t
    }
    const taoRecord = await this.create(data, options)
    return taoRecord
  }
  return TaoRecord
}
