'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TimeIntervalSchema = new Schema({
    id: String,
    name: String,  // 时段名称
    lessonId: String,  // 课程id
    schoolId: String,  // 驾校id
    isActive: String,  // 是否启用
    timeList: [
      {
        id: String,
        maxUseNumber: Number,  // 最大约课人数
        minutes: Number,    // 一共多少时间
        startTime: String,  // 开始时间
        endTime: String,   // 结束时间
        isOpen: String   // 是否开放
      }
    ],

  });
  return mongoose.model('TimeInterval', TimeIntervalSchema);
};