'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/api/car', controller.car.list);
  router.get('/api/car/:id', controller.car.get);
  router.post('/api/car', controller.car.add);
  router.put('/api/car/:id', controller.car.update);
  router.delete('/api/car/:id', controller.car.remove);
  // router.get('/api/excle', controller.car.excle);
};