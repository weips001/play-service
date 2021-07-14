'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TrainingGroundSchema = new Schema({
    id: String,
    schoolId: String,  // 驾校id
    name: String,   // 训练场名称
    address: String, // 训练场地址
    phone: String,  // 训练场电话
    longitudeAndLatitude: String,  // 训练场经纬度
    desc: String,  // 描述
    isEnable: String,  // 是否启用
    originalType:{
      type: String,
      default: 'C1',
      enum: ['C1','C2','B1','B2','A1','A2','A3','D','E','F','M','N','P']
    },  // 培训车型
    subject: {
      type: String,
      enum: ['subjectTwo', 'subjectThree']
    }, // 科目
    measure: String,  // 面积
    route: String,  // 乘车路线
    group: String, // 分组
    accommodateNumber: Number,  // 容纳车辆
    alreadyNumber: Number,   //  已投放车辆
  });
  return mongoose.model('TrainingGround', TrainingGroundSchema);
};