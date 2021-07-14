module.exports = app => {
  const { router, controller } = app
  // router.post('/api/vip/consume/:id', controller.vip.consume)
  router.resources('taoRecharge', '/api/taoRecharge', controller.taoRecharge)
}
// car, carManagement, addCar, editCar,
// dict, studentSource
// fund, fundList, addFundConfig, editFundConfig
// place, Place, addPlace, editPlace, regionList,
// regionAdd, regionEdit, classicList, classicAdd, classicEdit, signUp
// signUpAdd, signUpEdit
// student, studentList, studentListAdd, studentListEdit
// userSetting, user, addUser, editUser, role, addRole, editRole
