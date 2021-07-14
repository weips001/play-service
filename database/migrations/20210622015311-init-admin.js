'use strict'
const uuid = require('uuid').v4
module.exports = {
  // 在执行数据库升级时调用的函数，创建 admin 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID, NOW } = Sequelize
    await queryInterface.createTable('admin', {
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
          notNull: {
            msg: '姓名必须填写'
          },
          notEmpty: {
            msg: '姓名不能为空'
          }
        }
      },
      phone: {
        type: STRING(11),
        validate: {
          notNull: {
            msg: '姓名必须填写'
          },
          is: {
            args: /^[a-z]+$/i,
            msg: '手机格式不正确'
          }
        }
      },
      code: {
        type: STRING(5),
        defaultValue: '-1'
      },
      created_at: DATE,
      updated_at: DATE
    })
  },
  // 在执行数据库降级时调用的函数，删除 admin 表
  down: async queryInterface => {
    await queryInterface.dropTable('admin')
  }
}
