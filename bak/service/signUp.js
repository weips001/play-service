'use strict';

const Service = require('egg').Service;
const md5 = require('md5-node');
class signUpService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.SignUp.find(filter).skip(offset).limit(limit).populate('schoolName')
      .lean()
      .exec(),
      ctx.model.SignUp.countDocuments(filter)
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
    const doc = await ctx.model.SignUp.findOne({
      id
    }).lean().exec();
    return {
      code: 0,
      data: doc
    };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const app = this.app;
    const exist = await this.nameExist(data.signUpName, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '驾校名重复',
      };
    }
    const signUpModel = ctx.model.SignUp({
      id: ctx.helper.generateId(),
      imageUrl: data.imageUrl,
      signUpName: data.signUpName,
      schoolName: data.schoolName,
      contacts: data.contacts,
      contactsPhone: data.contactsPhone,
			address: data.address,
			coordinate: data.coordinate,
			enable: data.enable,
      billName: data.billName,
      showOnLine: data.showOnLine,
      payDept: data.payDept,
      billPrefix: data.billPrefix,
      sort: data.sort,
      desc: data.desc
    });
    await signUpModel.save();
    return {
      success: true,
      msg: '添加成功',
      code: 0
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const signUpModel = await ctx.model.SignUp.findOne({
      id
    }).exec();
    if (!signUpModel) {
      return {
        code: 1,
        msg: 'signUp不存在',
      };
    }
    if (typeof data.imageUrl !== 'undefined') {
      signUpModel.imageUrl = data.imageUrl;
    }
    if (typeof data.signUpName !== 'undefined') {
      signUpModel.signUpName = data.signUpName;
    }
    if (typeof data.schoolName !== 'undefined') {
      signUpModel.schoolName = data.schoolName;
    }
    if (typeof data.contacts !== 'undefined') {
      signUpModel.contacts = data.contacts;
    }
    if (typeof data.contactsPhone !== 'undefined') {
      signUpModel.contactsPhone = data.contactsPhone;
    }
    if (typeof data.sort !== 'undefined') {
      signUpModel.sort = data.sort;
    }
    if (typeof data.address !== 'undefined') {
      signUpModel.address = data.address;
    }
    if (typeof data.desc !== 'undefined') {
      signUpModel.desc = data.desc;
    }
    if (typeof data.coordinate !== 'undefined') {
      signUpModel.coordinate = data.coordinate;
    }
    if (typeof data.enable !== 'undefined') {
      signUpModel.enable = data.enable;
    }
    if (typeof data.billName !== 'undefined') {
      signUpModel.billName = data.billName;
    }
    if (typeof data.showOnLine !== 'undefined') {
      signUpModel.showOnLine = data.showOnLine;
    }
    if (typeof data.payDept !== 'undefined') {
      signUpModel.payDept = data.payDept;
    }
    if (typeof data.billPrefix !== 'undefined') {
      signUpModel.billPrefix = data.billPrefix;
    }
    signUpModel.updateTime = new Date();
    await signUpModel.save();
    return {
      success: true,
      msg: '修改成功',
      code: 0
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const signUp = await ctx.model.SignUp.findOne({
      id
    }).exec();
    if (!signUp) {
      return {
        code: 1,
        msg: '该驾校不存在',
      };
    }
    await signUp.remove();
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
    const signUp = await ctx.model.SignUp.findOne(filter).lean().exec();
    return !!signUp;
  }
  async phoneExist(callPhone) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
}
module.exports = signUpService;
