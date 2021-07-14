'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const WxUserSchema = new Schema({
    id: String,
    phone: String,
		userInfo: {
			type: Schema.Types.ObjectId,
			ref: 'Student'
		},
		markListOne: [],
    markListFour: [],
    openid: String,
    isVip: {
      type: Boolean,
      default: false
    },
    createTime: {
      type: Date,
      default: new Date()
    },
    updateTime: {
      type: Date,
      default: new Date()
    },
  });
  return mongoose.model('WxUser', WxUserSchema);
};