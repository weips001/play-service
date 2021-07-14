'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  // router.post('/api/login', controller.login.login);
  // router.post('/api/register', controller.login.register);
  // router.get('/api/init', controller.init.init);
  // router.get('/api/shoppingRecord', controller.shoppingRecord.list);
  // router.get('/api/gameBiRecord', controller.gameBiRecord.list);
  // router.post('/api/uploadConsumeRecord', controller.shoppingRecord.uploadFile);

  // require('./role')(app);
  // require('./user')(app);
  require('./admin')(app)
  require('./place')(app)
  require('./auth')(app)
  require('./role')(app)
  require('./roleAuth')(app)
  require('./user')(app)
  require('./userRole')(app)
  require('./vip')(app)
  // require('./place')(app)
  // require('./student')(app)
  // require('./gameBi')(app)
  // require('./vip')(app)
  // require('./statistics')(app)
}
