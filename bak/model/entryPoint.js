'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const EntryPointSchema = new Schema({
    id: String,
    schoolId: String,  // 驾校id
    name: String,   // 报名点名称
    address: String, // 报名点地址
    phone: String, // 报名点电话
    longitudeAndLatitude: String,  // 报名点经纬度
    desc: String,  // 描述
    isEnable: String   // 是否启用
  });
  return mongoose.model('EntryPoint', EntryPointSchema);
};