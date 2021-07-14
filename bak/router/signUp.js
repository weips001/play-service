'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/signUp', controller.signUp.list);
  router.get('/api/signUp/:id', controller.signUp.get);
  router.post('/api/signUp', controller.signUp.add);
  router.put('/api/signUp/:id', controller.signUp.update);
  router.delete('/api/signUp/:id', controller.signUp.remove);
};