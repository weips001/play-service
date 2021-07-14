'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const studentSourceSchema = new Schema({
    id: String,
    schoolId: String,  // 驾校id
    name: String,
    isActive: String,  // 是否启用
    isDefault: String,  // 是否为系统默认
    desc: String,  // 描述
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('studentSource', studentSourceSchema);
};