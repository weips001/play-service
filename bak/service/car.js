'use strict';

const Service = require('egg').Service;
class carService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Car.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.Car.countDocuments(filter)
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
    const doc = await ctx.model.Car.findOne({
      id
    }).lean().exec();
    return {
      code: 0,
      data: doc
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const exist = await this.nameExist(data.carNumber, data.id);
    const schoolId = ctx.request.header.schoolid;
    if (exist) {
      return {
        code: 1,
        msg: '车牌号重复',
      };
    }
    const carModel = ctx.model.Car({
      id: ctx.helper.generateId(),
      type: data.type,
      schoolId: schoolId,
      ...data
    });
    await carModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const carModel = await ctx.model.Car.findOne({
      id
    }).exec();
    if (!carModel) {
      return {
        code: 1,
        msg: 'car不存在',
      };
    }
    if (typeof data.carNumber !== 'undefined') {
      carModel.carNumber = data.carNumber;
    }
    if (typeof data.type !== 'undefined') {
      carModel.type = data.type;
    }
    if (typeof data.frameNumber !== 'undefined') {
      carModel.frameNumber = data.frameNumber;
    }
    if (typeof data.engineNumber !== 'undefined') {
      carModel.engineNumber = data.engineNumber;
    }
    if (typeof data.carFrom !== 'undefined') {
      carModel.carFrom = data.carFrom;
    }
    if (typeof data.brand !== 'undefined') {
      carModel.brand = data.brand;
    }
    if (typeof data.carModel !== 'undefined') {
      carModel.carModel = data.carModel;
    }
    if (typeof data.color !== 'undefined') {
      carModel.color = data.color;
    }
    if (typeof data.grade !== 'undefined') {
      carModel.grade = data.grade;
    }
    if (typeof data.buyingTime !== 'undefined') {
      carModel.buyingTime = data.buyingTime;
    }
    if (typeof data.carState !== 'undefined') {
      carModel.carState = data.carState;
    }
    if (typeof data.carType !== 'undefined') {
      carModel.carType = data.carType;
    }
    if (typeof data.carGroupId !== 'undefined') {
      carModel.carGroupId = data.carGroupId;
    }
    if (typeof data.carGroupName !== 'undefined') {
      carModel.carGroupName = data.carGroupName;
    }
    if (typeof data.trainingGroundId !== 'undefined') {
      carModel.trainingGroundId = data.trainingGroundId;
    }
    if (typeof data.trainingGroundName !== 'undefined') {
      carModel.trainingGroundName = data.trainingGroundName;
    }
    if (typeof data.carPurposeId !== 'undefined') {
      carModel.carPurposeId = data.carPurposeId;
    }
    if (typeof data.carPurposeName !== 'undefined') {
      carModel.carPurposeName = data.carPurposeName;
    }
    if (typeof data.coachId !== 'undefined') {
      carModel.coachId = data.coachId;
    }
    if (typeof data.coachName !== 'undefined') {
      carModel.coachName = data.coachName;
    }
    if (typeof data.gasolineId !== 'undefined') {
      carModel.gasolineId = data.gasolineId;
    }
    if (typeof data.belongAddressName !== 'undefined') {
      carModel.belongAddressName = data.belongAddressName;
    }
    if (typeof data.belongAddressId !== 'undefined') {
      carModel.belongAddressId = data.belongAddressId;
    }
    if (typeof data.FactoryTime !== 'undefined') {
      carModel.FactoryTime = data.FactoryTime;
    }
    if (typeof data.desc !== 'undefined') {
      carModel.desc = data.desc;
    }
    carModel.updateTime = new Date();
    await carModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const car = await ctx.model.Car.findOne({
      id
    }).exec();
    if (!car) {
      return {
        code: 1,
        msg: '车辆不存在',
      };
    }
    await car.remove();
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
    const car = await ctx.model.Car.findOne(filter).lean().exec();
    return !!car;
  }
}
module.exports = carService;
