'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/moneyType', controller.moneyType.list);
  router.get('/api/moneyType/:id', controller.moneyType.get);
  router.post('/api/moneyType', controller.moneyType.add);
  router.put('/api/moneyType/:id', controller.moneyType.update);
  router.delete('/api/moneyType/:id', controller.moneyType.remove);
};
