'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/trainingGround', controller.trainingGround.list);
  router.get('/api/trainingGround/:id', controller.trainingGround.get);
  router.post('/api/trainingGround', controller.trainingGround.add);
  router.put('/api/trainingGround/:id', controller.trainingGround.update);
  router.delete('/api/trainingGround/:id', controller.trainingGround.remove);
};
