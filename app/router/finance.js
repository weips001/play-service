module.exports = app => {
  const { router, controller } = app
  router.post('/api/getFinanceByDate', controller.finance.getFinanceByDate)
  router.post('/api/getFinanceByYear', controller.finance.getFinanceByYear)
  router.resources('finance', '/api/finance', controller.finance)
}
