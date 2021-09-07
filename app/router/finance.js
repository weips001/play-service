module.exports = app => {
  const { router, controller } = app
  router.resources('finance', '/api/finance', controller.finance)
}
