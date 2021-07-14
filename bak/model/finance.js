'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const FinanceSchema = new Schema({
		id: String,
		schoolId: String, // 驾校id
		studentInfo: {
			type: Schema.Types.ObjectId,
			res: 'Student'
		},
		clasSystem: {
			type: Schema.Types.ObjectId,
			ref: 'ClassSystem'
		}, // 班制
		ticketNum: String, // 票号
		shouldCharge: [{
			type: String || Number, // 类型 1 现金 2 刷卡 3 支付宝 4 微信 5 综合
			money: Number
		}]
	});
	return mongoose.model('Finance', FinanceSchema);
};