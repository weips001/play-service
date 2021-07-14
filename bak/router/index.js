'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.post('/api/login', controller.login.login);
  router.post('/api/wxLogin', controller.login.wxLogin);
  router.post('/api/register', controller.login.register);
  router.get('/api/init', controller.init.init);
  router.post('/api/getUserInfoByOpenId', controller.login.getUserInfoByopenId);
  router.post('/api/bindPhone', controller.login.bindPhone);
  router.post('/api/updateUserInfoByOpenId', controller.login.updateUserInfoByOpenId);

  require('./role')(app);
  require('./user')(app);
  require('./school')(app)
  require('./car')(app)
  require("./student")(app)
  require("./entryPoint")(app)
  require("./trainingGround")(app)
  require("./studentSource")(app)
  require("./classSystem")(app)
  require("./moneyType")(app)
  require("./signUp")(app)
  require("./subject")(app)
  require("./specialExercises")(app)
};
