'use strict';

const Service = require('egg').Service;
class RoleService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.MoneyType.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.MoneyType.countDocuments(filter)
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
    const doc = await ctx.model.MoneyType.findOne({
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
        msg: '款项名重复',
      };
    }
    const RoleModel = ctx.model.MoneyType({
      id: ctx.helper.generateId(),
      name: data.name,
      moneyType: data.moneyType,
      moneyUseing: data.moneyUseing,
      moneyNum: data.moneyNum,
      sort: data.sort,
      desc: data.desc,
      isActive: data.isActive,
      isDiscount: data.isDiscount,
      schoolId
    });
    await RoleModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const RoleModel = await ctx.model.MoneyType.findOne({
      id
    }).exec();
    if (!RoleModel) {
      return {
        code: 1,
        msg: '款项不存在',
      };
    }
    // const exist = await this.nameExist(data.name, data._id);
    // if (exist) {
    //   return {
    //     code: 1,
    //     msg: '角色名重复',
    //   };
    // }
    if (typeof data.name !== 'undefined') {
      RoleModel.name = data.name;
    }
    if (typeof data.moneyType !== 'undefined') {
      RoleModel.moneyType = data.moneyType;
    }
    if (typeof data.moneyUseing !== 'undefined') {
      RoleModel.moneyUseing = data.moneyUseing;
    }
    if (typeof data.moneyNum !== 'undefined') {
      RoleModel.moneyNum = data.moneyNum;
    }
    if (typeof data.moneyUseing !== 'undefined') {
      RoleModel.moneyUseing = data.moneyUseing;
    }
    if (typeof data.sort !== 'undefined') {
      RoleModel.sort = data.sort;
    }
    if (typeof data.desc !== 'undefined') {
      RoleModel.desc = data.desc;
    }
    if (typeof data.isActive !== 'undefined') {
      RoleModel.isActive = data.isActive;
    }
    if (typeof data.isDiscount !== 'undefined') {
      RoleModel.isDiscount = data.isDiscount;
    }
    RoleModel.updateTime = new Date();
    await RoleModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const MoneyType = await ctx.model.MoneyType.findOne({
      id
    }).exec();
    if (!MoneyType) {
      return {
        code: 1,
        msg: '该款项不存在',
      };
    }
    await MoneyType.remove();
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
    const MoneyType = await ctx.model.MoneyType.findOne(filter).lean().exec();
    return !!MoneyType;
  }
}
module.exports = RoleService;
