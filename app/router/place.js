module.exports = app => {
  const { router, controller } = app
  router.resources('place', '/api/place', controller.place)
}
