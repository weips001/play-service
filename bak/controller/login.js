'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5-node');
const axios = require('axios')
const appid = 'wx3480a47e52458952'


class HomeController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    const { js_code } = ctx.request.body;
    const secret = '25554c7dca8fd4aded2f7fba5b349ef5'
    const grant_type = 'authorization_code'
    let {data} = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`)
    const body = {
      session_key: data.session_key,
      openid: data.openid,
    }
    ctx.body = { code: 0, ...body }
  }
  async login() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    data.password = md5(data.password);
    const UserModel = await ctx.model.User.findOne(data).exec();
    if (UserModel) {
      if (UserModel.schoolId) {
        const school = await ctx.model.School.findOne({ id: UserModel.schoolId }).exec();
        if (school && school.perioOfValidity && new Date() > school.perioOfValidity) {
          if (UserModel.role.includes(-2)) {
            UserModel.overdue = false
          } else {
            UserModel.overdue = true
          }
        }
      }
      const token = app.jwt.sign({
        name: data.name
      }, app.config.jwt.secret, {
        expiresIn: 60 * 60,
      });
      UserModel.token = token;
      const schoolId = UserModel.schoolId
      await UserModel.save();
      ctx.body = {
        code: 0,
        token,
        schoolId,
        overdue: UserModel.overdue,
      };
      return;
    }
    ctx.body = {
      code: 1,
      msg: '用户名或密码错误',
    };
    return;
  }
  async register() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    if (!data.callPhone) {
      ctx.body = {
        code: 1,
        msg: '请输入手机号',
      };
      return;
    }
    if (!data.name) {
      ctx.body = {
        code: 1,
        msg: '请输入姓名',
      };
      return;
    }
    const exist = await this.phoneExist(data.callPhone);
    if (exist) {
      this.ctx.body = {
        code: 1,
        msg: '用户已存在',
      };
      return;
    }
    if (!data.password) {
      ctx.body = {
        code: 1,
        msg: '请输入密码',
      };
      return;
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60,
    });

    const userModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      password: md5(data.password),
      callPhone: data.callPhone,
      token,
    });
    await userModel.save();
    ctx.body = {
      code: 0,
      token,
      msg: '注册成功',
    };
    return;
  }
  async phoneExist(callPhone, password) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    if (password) {
      filter.password = password;
    }
    const user = await ctx.model.User.findOne(filter).lean().exec();
    if (user) {
      return {
        isUser: !!user
      };
    }

  }
  async bindPhone() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    const StudentModel = await ctx.model.Student.findOne({
      phone: data.phone
    }).exec()
    let  WxUserModel = await ctx.model.WxUser.findOne({
      phone: data.phone
    }).exec()
    if(!WxUserModel) {
      WxUserModel = await ctx.model.WxUser({
        id: ctx.helper.generateId(),
        phone: data.phone,
        openid: data.openid,
        userInfo: StudentModel ? StudentModel._id : null
      })
      await WxUserModel.save()
    }
    const newWxUserModel = await ctx.model.WxUser.findOne({
      openid: data.openid,
    }).exec()
    if (StudentModel) {
      StudentModel.wxUserInfo = newWxUserModel._id
      await StudentModel.save()
    }
    ctx.body = {
      code: 0,
      success: true,
      msg: '绑定成功',
      data: newWxUserModel
    }
  }
  async getUserInfoByopenId() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    const WxUserInfo = await ctx.model.WxUser.findOne({
      openid: data.openid
    }).populate('userInfo').exec()
    if (WxUserInfo) {
      ctx.body = {
        code: 0,
        success: true,
        data: WxUserInfo
      }
      return
    } else {
      ctx.body = {
        code: 1,
        success: false
      }
      return
    }
  }

  async updateUserInfoByOpenId() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    const WxUserModel = ctx.model.WxUser.findOne({
      openid: data.openid
    }).exec()
    if (!WxUserModel) {
      return {
        code: 1,
        msg: '学员不存在',
      };
    }
    if (typeof data.markListOne !== 'undefined') {
      WxUserModel.markListOne.push(data.markListOne)
    }
    if (typeof data.markListFour !== 'undefined') {
      WxUserModel.markListFour.push(data.markListFour)
    }
    WxUserModel.updateTime = new Date();
    await WxUserModel.save();
    ctx.body = {
      success: true,
      msg: '修改成功',
      code: 0,
      data: WxUserModel
    }
    return
  }
}

module.exports = HomeController;