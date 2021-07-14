'use strict';

const Service = require('egg').Service;
class RoleService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.ClassSystem.find(filter).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.ClassSystem.countDocuments(filter)
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
    const doc = await ctx.model.ClassSystem.findOne({
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
        msg: '班制名重复',
      };
    }
    const RoleModel = ctx.model.ClassSystem({
      id: ctx.helper.generateId(),
      name: data.name,
      originalType: data.originalType,
      isActive: data.isActive,
      minDate: data.minDate,
      typeOfCar: data.typeOfCar,
      studentComeType: data.studentComeType,
      twoType: data.twoType,
      threeType: data.threeType,
      group: data.group,
      isChooseTeacher: data.isChooseTeacher,
      isOnLine: data.isOnLine,
      sort: data.sort,
      price: data.price,
      payType: data.payType,
      earnestMoney: data.earnestMoney,
      desc: data.desc,
      priceItem: data.priceItem,
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
    const RoleModel = await ctx.model.ClassSystem.findOne({
      id
    }).exec();
    if (!RoleModel) {
      return {
        code: 1,
        msg: '班制不存在',
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
    if (typeof data.originalType !== 'undefined') {
      RoleModel.originalType = data.originalType;
    }
    if (typeof data.desc !== 'undefined') {
      RoleModel.auth = data.auth;
    }
    if (typeof data.isActive !== 'undefined') {
      RoleModel.isActive = data.isActive;
    }
    if (typeof data.minDate !== 'undefined') {
      RoleModel.minDate = data.minDate;
    }
    if (typeof data.typeOfCar !== 'undefined') {
      RoleModel.typeOfCar = data.typeOfCar;
    }
    if (typeof data.studentComeType !== 'undefined') {
      RoleModel.studentComeType = data.studentComeType;
    }
    if (typeof data.twoType !== 'undefined') {
      RoleModel.twoType = data.twoType;
    }
    if (typeof data.threeType !== 'undefined') {
      RoleModel.threeType = data.threeType;
    }
    if (typeof data.group !== 'undefined') {
      RoleModel.group = data.group;
    }
    if (typeof data.isChooseTeacher !== 'undefined') {
      RoleModel.isChooseTeacher = data.isChooseTeacher;
    }
    if (typeof data.isOnLine !== 'undefined') {
      RoleModel.isOnLine = data.isOnLine;
    }
    if (typeof data.sort !== 'undefined') {
      RoleModel.sort = data.sort;
    }
    if (typeof data.price !== 'undefined') {
      RoleModel.price = data.price;
    }
    if (typeof data.payType !== 'undefined') {
      RoleModel.payType = data.payType;
    }
    if (typeof data.earnestMoney !== 'undefined') {
      RoleModel.earnestMoney = data.earnestMoney;
    }
    if (typeof data.desc !== 'undefined') {
      RoleModel.desc = data.desc;
    }
    if (typeof data.priceItem !== 'undefined') {
      RoleModel.priceItem = data.priceItem;
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
    const ClassSystem = await ctx.model.ClassSystem.findOne({
      id
    }).exec();
    if (!ClassSystem) {
      return {
        code: 1,
        msg: '该班制不存在',
      };
    }
    await ClassSystem.remove();
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
    const ClassSystem = await ctx.model.ClassSystem.findOne(filter).lean().exec();
    return !!ClassSystem;
  }
}
module.exports = RoleService;
