'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/entryPoint', controller.entryPoint.list);
  router.get('/api/entryPoint/:id', controller.entryPoint.get);
  router.post('/api/entryPoint', controller.entryPoint.add);
  router.put('/api/entryPoint/:id', controller.entryPoint.update);
  router.delete('/api/entryPoint/:id', controller.entryPoint.remove);
};
