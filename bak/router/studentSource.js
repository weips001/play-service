'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/studentSource', controller.studentSource.list);
  router.get('/api/studentSource/:id', controller.studentSource.get);
  router.post('/api/studentSource', controller.studentSource.add);
  router.put('/api/studentSource/:id', controller.studentSource.update);
  router.delete('/api/studentSource/:id', controller.studentSource.remove);
};
