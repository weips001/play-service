'use strict';

const Service = require('egg').Service;
class StudentSourceService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.StudentSource.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.StudentSource.countDocuments(filter)
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
    const doc = await ctx.model.StudentSource.findOne({
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
        msg: '生源地名重复',
      };
    }
    const StudentSourceModel = ctx.model.StudentSource({
      id: ctx.helper.generateId(),
      schoolId,
      ...data
    });
    await StudentSourceModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const StudentSourceModel = await ctx.model.StudentSource.findOne({
      id
    }).exec();
    if (!StudentSourceModel) {
      return {
        code: 1,
        msg: '生源地不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      StudentSourceModel.name = data.name;
    }
    if (typeof data.isActive !== 'undefined') {
      StudentSourceModel.isActive = data.isActive;
    }
    if (typeof data.isDefault !== 'undefined') {
      StudentSourceModel.isDefault = data.isDefault;
    }
    StudentSourceModel.updateTime = new Date();
    await StudentSourceModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const StudentSource = await ctx.model.StudentSource.findOne({
      id
    }).exec();
    if (!StudentSource) {
      return {
        code: 1,
        msg: '该生源地不存在',
      };
    }
    await StudentSource.remove();
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
    const StudentSource = await ctx.model.StudentSource.findOne(filter).lean().exec();
    return !!StudentSource;
  }
}
module.exports = StudentSourceService;
