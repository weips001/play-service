'use strict';

const Service = require('egg').Service;
class TrainingGroundService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.TrainingGround.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.TrainingGround.countDocuments(filter)
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
    const doc = await ctx.model.TrainingGround.findOne({
      id
    }).lean().exec();
    return {
      code: 0,
      data: doc
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const schoolId = ctx.request.header.schoolid;
    const exist = await this.nameExist(data.name, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '训两场名称重复',
      };
    }
    const TrainingGroundModel = ctx.model.TrainingGround({
      id: ctx.helper.generateId(),
      schoolId,
      name: data.name,
      address: data.address,
      phone: data.phone,
      longitudeAndLatitude: data.longitudeAndLatitude,
      desc: data.desc,
      isEnable: data.isEnable,
      originalType: data.originalType,
      subject: data.subject,
      measure: data.measure,
      route: data.route,
      group: data.group,
      accommodateNumber: data.accommodateNumber,
      alreadyNumber: data.alreadyNumber,
    });
    await TrainingGroundModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const TrainingGroundModel = await ctx.model.TrainingGround.findOne({
      id
    }).exec();
    if (!TrainingGroundModel) {
      return {
        code: 1,
        msg: '训练场不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      TrainingGroundModel.name = data.name;
    }
    if (typeof data.address !== 'undefined') {
      TrainingGroundModel.address = data.address;
    }
    if (typeof data.phone !== 'undefined') {
      TrainingGroundModel.phone = data.phone;
    }
    if (typeof data.longitudeAndLatitude !== 'undefined') {
      TrainingGroundModel.longitudeAndLatitude = data.longitudeAndLatitude;
    }
    if (typeof data.desc !== 'undefined') {
      TrainingGroundModel.desc = data.desc;
    }
    if (typeof data.isEnable !== 'undefined') {
      TrainingGroundModel.isEnable = data.isEnable;
    }
    if (typeof data.originalType !== 'undefined') {
      TrainingGroundModel.originalType = data.originalType;
    }
    if (typeof data.subject !== 'undefined') {
      TrainingGroundModel.subject = data.subject;
    }
    if (typeof data.measure !== 'undefined') {
      TrainingGroundModel.measure = data.measure;
    }
    if (typeof data.route !== 'undefined') {
      TrainingGroundModel.route = data.route;
    }
    if (typeof data.group !== 'undefined') {
      TrainingGroundModel.group = data.group;
    }
    if (typeof data.accommodateNumber !== 'undefined') {
      TrainingGroundModel.accommodateNumber = data.accommodateNumber;
    }
    if (typeof data.alreadyNumber !== 'undefined') {
      TrainingGroundModel.alreadyNumber = data.alreadyNumber;
    }
    TrainingGroundModel.updateTime = new Date();
    await TrainingGroundModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const TrainingGround = await ctx.model.TrainingGround.findOne({
      id
    }).exec();
    if (!TrainingGround) {
      return {
        code: 1,
        msg: '训练场不存在',
      };
    }
    await TrainingGround.remove();
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
    const TrainingGround = await ctx.model.TrainingGround.findOne(filter).lean().exec();
    return !!TrainingGround;
  }
}
module.exports = TrainingGroundService;
