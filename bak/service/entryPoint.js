'use strict';

const Service = require('egg').Service;
class EntryPointService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.EntryPoint.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.EntryPoint.countDocuments(filter)
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
    const doc = await ctx.model.EntryPoint.findOne({
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
        msg: '报名点名称重复',
      };
    }
    const EntryPointModel = ctx.model.EntryPoint({
      id: ctx.helper.generateId(),
      name: data.name,
      auth: data.auth,
      desc: data.desc,
      schoolId
    });
    await EntryPointModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const EntryPointModel = await ctx.model.EntryPoint.findOne({
      id
    }).exec();
    if (!EntryPointModel) {
      return {
        code: 1,
        msg: '报名点不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      EntryPointModel.name = data.name;
    }
    if (typeof data.address !== 'undefined') {
      EntryPointModel.address = data.address;
    }
    if (typeof data.phone !== 'undefined') {
      EntryPointModel.phone = data.phone;
    }
    if (typeof data.longitudeAndLatitude !== 'undefined') {
      EntryPointModel.longitudeAndLatitude = data.longitudeAndLatitude;
    }
    if (typeof data.desc !== 'undefined') {
      EntryPointModel.desc = data.desc;
    }
    if (typeof data.isEnable !== 'undefined') {
      EntryPointModel.isEnable = data.isEnable;
    }
    EntryPointModel.updateTime = new Date();
    await EntryPointModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const EntryPoint = await ctx.model.EntryPoint.findOne({
      id
    }).exec();
    if (!EntryPoint) {
      return {
        code: 1,
        msg: '该报名点不存在',
      };
    }
    await EntryPoint.remove();
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
    const EntryPoint = await ctx.model.EntryPoint.findOne(filter).lean().exec();
    return !!EntryPoint;
  }
}
module.exports = EntryPointService;
