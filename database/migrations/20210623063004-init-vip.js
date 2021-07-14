'use strict'
const uuid = require('uuid').v4
const dayjs = require('dayjs')
module.exports = {
  // 在执行数据库升级时调用的函数，创建 vip 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID, BOOLEAN, CHAR } = Sequelize
    await queryInterface.createTable('vip', {
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
      isYearCard: {
        type: BOOLEAN,
        field: 'is_year_card',
        defaultValue: false
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
            args: [['0'], ['-1']],
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
        allowNull: false,
        field: 'used_total',
        comment: '会员卡已使用次数',
        validate: {
          notEmpty: {
            msg: '会员卡已使用次数不能為空'
          }
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
            args: [['0'], ['1']],
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
          },
          isBefore: dayjs().format('YYYY-MM-DD')
        }
      },
      overdate: {
        type: DATE,
        allowNull: false,
        comment: '过期时间',
      },
      placeId: {
        type: UUID,
        field: 'place_id',
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE
    })
  },
  // 在执行数据库降级时调用的函数，删除 vip 表
  down: async queryInterface => {
    await queryInterface.dropTable('vip')
  }
}

// {
//   "name": "张三",
//   "phone": "13271591339",
//   "cardId": "0001",
//   "cardType": "0",
//   "money": 300,
//   "total": 10,
//   "restTotal": 10,
//   "usedTotal": 0,
//   "remark": "新充的会员",
//   "sex": "0",
//   "birthday": "2003-01-01",
//   "overdate": "2013-01-01",
//   "placeId": "3ace676723b54fd5ac91e090024d4e53"
// }