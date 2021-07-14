module.exports = app => {
  const { router, controller, jwt } = app
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/currentUser', jwt, controller.user.getCurrentUser)
  router.resources('user', '/api/user', controller.user)
}
