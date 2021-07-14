module.exports = app => {
  const { router, controller } = app
  router.resources('admin', '/admin', controller.admin)
}
