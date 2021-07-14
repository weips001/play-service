'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MoneyTypeSchema = new Schema({
    id: String,
    name: String,  // 角色名称
    schoolId: String,  // 驾校id
    moneyType: String, // 0 学员类 1 其他类
    moneyUseing: String,  // 款项用途 0 收入 1 支出 2 代收
    moneyNum: Number,  // 收费标准  只能是数字
    sort: String, // 排序
    desc: String,  // 描述
    isActive: String,  //使用状态 0 未使用 1 使用
    isDiscount: String,  // 是否优惠  0 不优惠 1 优惠
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('MoneyTyoe', MoneyTypeSchema);
};