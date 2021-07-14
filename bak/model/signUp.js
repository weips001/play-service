'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SignUpSchema = new Schema({
    id: String,
		imageUrl: String, // 封面图片
		signUpName: String, // 报名点名称
		schoolName: {
			type: Schema.Types.ObjectId,
			ref: 'TrainingGround'
		}, // 关联校区
		contacts: String, // 联系人姓名
		contactsPhone: String, // 联系电话
		sort: String, // 排序
		address: String, // 地址
		desc: String, // 描述
		coordinate: String, // 坐标
		enable: Boolean, // 启用状态
		billName: String, // 发票抬头
		showOnLine: Boolean, // 线上展示
		payDept: String, // 收款单位
		billPrefix: String  // 票号前缀
  });
  return mongoose.model('SignUp', SignUpSchema);
};