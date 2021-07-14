module.exports = app => {
  const { router, controller } = app
  router.get('/api/allAuth', controller.auth.getAllAuth)
  router.resources('auth', '/api/auth', controller.auth)
}
