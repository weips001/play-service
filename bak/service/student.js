'use strict';

const Service = require('egg').Service;
class StudentService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Student.find(filter).populate('source', {
        name: 1
      }).populate('sourceAddress', {
        signUpName: 1
      }).populate('introducer', {
        name: 1
      }).populate('clasSystem', {
        name: 1
      }).populate('trainingGround', {
        name: 1
      }).populate('financeInfo').populate('wxUserInfo').skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.Student.countDocuments(filter)
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
    const doc = await ctx.model.Student.findOne({
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
    const exist = await this.nameExist(data.certificatesNumber, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '角色名重复',
      };
    }
    const StudentModel = ctx.model.Student({
      id: ctx.helper.generateId(),
      schoolId,
      ...data
    });
    await StudentModel.save();
    const obj = {
      studentInfo: StudentModel._id,
      clasSystem: StudentModel.clasSystem,
      schoolId,
    }
    const res = await ctx.service.finance.add(obj)
    StudentModel.financeInfo = res.data._id
    await StudentModel.save()
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const StudentModel = await ctx.model.Student.findOne({
      id
    }).exec();
    if (!StudentModel) {
      return {
        code: 1,
        msg: '学员不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      StudentModel.name = data.name;
    }
    if (typeof data.nationality !== 'undefined') {
      StudentModel.nationality = data.nationality;
    }
    if (typeof data.gender !== 'undefined') {
      StudentModel.gender = data.gender;
    }
    if (typeof data.certificatesType !== 'undefined') {
      StudentModel.certificatesType = data.certificatesType;
    }
    if (typeof data.certificatesNumber !== 'undefined') {
      StudentModel.certificatesNumber = data.certificatesNumber;
    }
    if (typeof data.birthday !== 'undefined') {
      StudentModel.birthday = data.birthday;
    }
    if (typeof data.endDay !== 'undefined') {
      StudentModel.endDay = data.endDay;
    }
    if (typeof data.phone !== 'undefined') {
      StudentModel.phone = data.phone;
    }
    if (typeof data.phoneOne !== 'undefined') {
      StudentModel.phoneOne = data.phoneOne;
    }
    if (typeof data.address !== 'undefined') {
      StudentModel.address = data.address;
    }
    if (typeof data.residentialAddress !== 'undefined') {
      StudentModel.residentialAddress = data.residentialAddress;
    }
    if (typeof data.source !== 'undefined') {
      StudentModel.source = data.source;
    }
    if (typeof data.sourceDate !== 'undefined') {
      StudentModel.sourceDate = data.sourceDate;
    }
    if (typeof data.sourceAddress !== 'undefined') {
      StudentModel.sourceAddress = data.sourceAddress;
    }
    if (typeof data.introducer !== 'undefined') {
      StudentModel.introducer = data.introducer;
    }
    if (typeof data.basinessType !== 'undefined') {
      StudentModel.basinessType = data.basinessType;
    }
    if (typeof data.originalType !== 'undefined') {
      StudentModel.originalType = data.originalType;
    }
    if (typeof data.originalId !== 'undefined') {
      StudentModel.originalId = data.originalId;
    }
    if (typeof data.group !== 'undefined') {
      StudentModel.group = data.group;
    }
    if (typeof data.typeName !== 'undefined') {
      StudentModel.typeName = data.typeName;
    }
    if (typeof data.clasSystem !== 'undefined') {
      StudentModel.clasSystem = data.clasSystem;
    }

    if (typeof data.trainingGround !== 'undefined') {
      StudentModel.trainingGround = data.trainingGround;
    }
    if (typeof data.coach !== 'undefined') {
      StudentModel.coach = data.coach;
    }
    if (typeof data.complete !== 'undefined') {
      StudentModel.complete = data.complete;
    }
    if (typeof data.desc !== 'undefined') {
      StudentModel.desc = data.desc;
    }
    if (typeof data.payInfo !== 'undefined') {
      StudentModel.payInfo = data.payInfo;
    }
    if (typeof data.ticketNumber !== 'undefined') {
      StudentModel.ticketNumber = data.ticketNumber;
    }
    if (typeof data.desc !== 'undefined') {
      StudentModel.desc = data.desc;
    }
    StudentModel.updateTime = new Date();
    await StudentModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const Student = await ctx.model.Student.findOne({
      id
    }).exec();
    if (!Student) {
      return {
        code: 1,
        msg: '该学员不存在',
      };
    }
    const Finance = await ctx.model.Finance.findOne({
      studentInfo: Student._id
    })
    if (!!Finance) {
      await Finance.remove();
    }
    await Student.remove();
    return {
      success: true,
      msg: '删除成功',
      code: 0,
    };
  }
  async nameExist(certificatesNumber, id) {
    const ctx = this.ctx;
    const filter = {
      certificatesNumber,
    };
    if (id) {
      filter.id = {
        $ne: id
      };
    }
    const Student = await ctx.model.Student.findOne(filter).lean().exec();
    return !!Student;
  }
}
module.exports = StudentService;