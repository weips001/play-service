'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CarSchema = new Schema({
    id: String,
    schoolId: String, // 驾校Id
    carNumber: String, // 车牌号
    type: String, // 培训车型
    frameNumber: String, // 车架号
    engineNumber: String, // 发动机号
    carFrom: String, // 生产厂家
    brand: String, // 车辆品牌
    carModel: String, // 车辆型号
    color: String, // 车牌颜色
    grade: String, // 技术等级
    buyingTime: Date, // 购买时间
    carState: String, // 车辆状态
    carType: String, // 车辆类型
    carGroupId: String, // 车辆分组
    carGroupName: String, // 车辆分组
    trainingGroundId: String, // 训练场
    trainingGroundName: String, // 训练场
    carPurposeId: String, // 车辆用途
    carPurposeName: String, // 车辆用途
    coachId: String, // 教练Id
    coachName: String, // 教练名称
    gasolineId: String, // 汽油卡号
    belongAddressName: String, // 所属报名点
    belongAddressId: String, // 所属报名点
    FactoryTime: Date, // 出厂时间
    desc: String, // 备注
  });
  return mongoose.model('Car', CarSchema);
};