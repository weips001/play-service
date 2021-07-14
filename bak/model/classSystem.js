'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ClassSystemSchema = new Schema({
    id: String,
    schoolId: String,
    name: String,  // 班制名称
    originalType: {
      type: String,
      default: 'C1',
      enum: ['C1', 'C2', 'B1', 'B2', 'A1', 'A2', 'A3', 'D', 'E', 'F', 'M', 'N', 'P']
    },   // 报名车型
    isActive: String,  // 是否启用 0 不启用 1 启用
    minDate: String,  // 最快拿证时间 多少天
    typeOfCar: String, // 车辆品牌 如大众
    studentComeType: String, // 0 班车接送 1 教练接送 2 自行前往
    twoType: String, // 科二车辆分配 1 一人一车 2 二人一车 3 三人一车 4 四人一车 5 多人一车
    threeType: String, // 科三车辆分配 1 一人一车 2 二人一车 3 三人一车 4 四人一车 5 多人一车
    group: String, // 分组
    isChooseTeacher: String,  // 学员自选教练 0 非自选 1 自选
    isOnLine: String,  // 线上是否显示 0 不显示 1 显示
    sort: String, // 排序
    price: String,  // 班级原价价格
    payType: String, // 付款模式 0 线上支付全款 1 线上支付定金 2 不支付
    earnestMoney: String, // 定金
    desc: String, // 描述
    priceItem: [
      {
        priceType: String, // 费用类型  从财务款项配置而来
        price: String, // 费用
      }
    ], // 费用明细
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('ClassSystem', ClassSystemSchema);
};
