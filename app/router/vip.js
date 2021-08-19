module.exports = app => {
  const { router, controller } = app
  router.post('/api/vip/consume/:id', controller.vip.consume)
  router.get('/api/vip/getVipRecord', controller.vip.getVipRecord)
  // TODO: 同步数据时使用
  router.get('/api/vip/getDetailByPhone', controller.vip.getDetailByPhone)
  router.get('/api/vip/updateTime', controller.vip.updateTime)
  router.get('/api/vip/getVipBySearchKey', controller.vip.getVipBySearchKey)
  router.resources('vip', '/api/vip', controller.vip)
}
// car, carManagement, addCar, editCar,
// dict, studentSource
// fund, fundList, addFundConfig, editFundConfig
// place, Place, addPlace, editPlace, regionList,
// regionAdd, regionEdit, classicList, classicAdd, classicEdit, signUp
// signUpAdd, signUpEdit
// student, studentList, studentListAdd, studentListEdit
// userSetting, user, addUser, editUser, role, addRole, editRole
