'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const StudentSchema = new Schema({
    id: String,
    schoolId: String, // 驾校Id
    name: String, // 姓名
    nationality: String, // 国籍
    gender: String, // 性别
    certificatesType: {
      type: String,
      defaule: 'ID',
      enum: ['ID', 'passport', 'certificateOfOfficers', 'other']
    }, // 证件类型 默认身份证
    certificatesNumber: String, //证件号
    birthday: Date || String, // 生日
    endDay: Date || String, // 证件有效日截至日期
    phone: String, // 手机号
    phoneOne: String, // 手机号1
    ownCode: String, // 自编号
    address: String, // 身份证地址
    residentialAddress: String, // 居住地址
    source: {
      type: Schema.Types.ObjectId,
      ref: 'studentSource'
    }, //  招生来源
    sourceDate: Date || String, // 报名时间
    sourceAddress: {
      type: Schema.Types.ObjectId,
      ref: 'SignUp'
    }, // 报名点
    introducer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }, // 介绍人
    basinessType: String, // 业务类型
    originalType: {
      type: String,
      default: 'C1',
      enum: ['C1', 'C2', 'B1', 'B2', 'A1', 'A2', 'A3', 'D', 'E', 'F', 'M', 'N', 'P']
    },
    originalId: String, // 原驾驶证号
    group: String, // 学院分组
    typeName: {
      type: String,
      default: 'C1',
      enum: ['C1', 'C2', 'B1', 'B2', 'A1', 'A2', 'A3', 'D', 'E', 'F', 'M', 'N', 'P']
    }, // 报名车型
    clasSystem: {
      type: Schema.Types.ObjectId,
      ref: 'ClassSystem'
    }, // 班制
    trainingGround: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingGround',
    }, // 训练场
    coach: String, // 预选教练
    complete: String, // 资料是否齐全
    desc: String, // 备注
    payInfo: [{
      type: String, // 缴费类型
      mode: String, // 付费方式
      paidAmount: String, // 实缴金额
      discountAmount: String, // 优惠金额
      discountReason: String, // 优惠理由
    }],
    arrears: String, // 欠费
    ticketNumber: String, // 票号
    desc: String, // 备注
    inputUser: String, // 录入人
    postCode: {
      type: String,
      default: '450000'
    },
    studentSource: {
      type: String,
      default: '1'
    }, // 生源地 本地 1 外地 0
    mailbox: String, // 邮箱
    wxUserInfo: {
      type: Schema.Types.ObjectId,
      ref: 'WxUser'
    },
    financeInfo: {
      type: Schema.Types.ObjectId,
      ref: 'Finance'
    }
  });
  return mongoose.model('Student', StudentSchema);
};