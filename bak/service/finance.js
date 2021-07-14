'use strict';

const Service = require('egg').Service;
class FinanceService extends Service {
	async list(filter, limit = 10, offset = 0) {
		const ctx = this.ctx;
		const [list, total] = await Promise.all([
			ctx.model.Finance.find(filter).skip(offset).limit(limit)
			.lean()
			.exec(),
			ctx.model.Finance.countDocuments(filter)
			.lean()
			.exec(),
		]);
		return {
			list,
			total,
			code: 0
		};
	}
	async get(id) {
		const ctx = this.ctx;
		const doc = await ctx.model.Finance.findOne({
			id
		}).lean().exec();
		return {
			code: 0,
			data: doc
		};
	}
	async add(data = {}) {
		const ctx = this.ctx;
		const FinanceModel = ctx.model.Finance({
			id: ctx.helper.generateId(),
			studentInfo: data.studentInfo,
			schoolId: data.schoolId,
			clasSystem: data.clasSystem
		});
		await FinanceModel.save();
		return {
			success: true,
			msg: '添加成功',
			data: FinanceModel,
			code: 0
		};
	}
	async update(id, data = {}) {
		const ctx = this.ctx;
		const FinanceModel = await ctx.model.Finance.findOne({
			id
		}).exec();
		if (!FinanceModel) {
			return {
				code: 1,
				msg: '报名点不存在',
			};
		}
		if (typeof data.name !== 'undefined') {
			FinanceModel.name = data.name;
		}
		if (typeof data.address !== 'undefined') {
			FinanceModel.address = data.address;
		}
		if (typeof data.phone !== 'undefined') {
			FinanceModel.phone = data.phone;
		}
		if (typeof data.longitudeAndLatitude !== 'undefined') {
			FinanceModel.longitudeAndLatitude = data.longitudeAndLatitude;
		}
		if (typeof data.desc !== 'undefined') {
			FinanceModel.desc = data.desc;
		}
		if (typeof data.isEnable !== 'undefined') {
			FinanceModel.isEnable = data.isEnable;
		}
		FinanceModel.updateTime = new Date();
		await FinanceModel.save();
		return {
			success: true,
			msg: '修改成功',
			code: 0
		};
	}
	async remove(id) {
		const ctx = this.ctx;
		const Finance = await ctx.model.Finance.findOne({
			id
		}).exec();
		if (!Finance) {
			return {
				code: 1,
				msg: '该报名点不存在',
			};
		}
		await Finance.remove();
		return {
			success: true,
			msg: '删除成功',
			code: 0,
		};
	}
	async nameExist(name, id) {
		const ctx = this.ctx;
		const filter = {
			name,
		};
		if (id) {
			filter.id = {
				$ne: id
			};
		}
		const Finance = await ctx.model.Finance.findOne(filter).lean().exec();
		return !!Finance;
	}
}
module.exports = FinanceService;