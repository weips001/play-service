module.exports = app => {
  const { router, controller } = app
  router.get('/api/getAllRole', controller.role.getAllRole)
  router.resources('role', '/api/role', controller.role)
}
