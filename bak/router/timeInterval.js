'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/timeInterval', controller.timeInterval.list);
  router.get('/api/timeInterval/:id', controller.timeInterval.get);
  router.post('/api/timeInterval', controller.timeInterval.add);
  router.put('/api/timeInterval/:id', controller.timeInterval.update);
  router.delete('/api/timeInterval/:id', controller.timeInterval.remove);
};
