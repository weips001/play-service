'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/classSystem', controller.classSystem.list);
  router.get('/api/classSystem/:id', controller.classSystem.get);
  router.post('/api/classSystem', controller.classSystem.add);
  router.put('/api/classSystem/:id', controller.classSystem.update);
  router.delete('/api/classSystem/:id', controller.classSystem.remove);
};
