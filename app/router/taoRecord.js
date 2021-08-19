module.exports = app => {
  const { router, controller } = app
  // router.post('/api/taoRecharge/consume/:id', controller.taoRecharge.consume)
  // router.get('/api/getTaoRecharge', controller.taoRecharge.getTaoRecharge)
  router.resources('taoRecord', '/api/taoRecord', controller.taoRecord)
}
// car, carManagement, addCar, editCar,
// dict, studentSource
// fund, fundList, addFundConfig, editFundConfig
// place, Place, addPlace, editPlace, regionList,
// regionAdd, regionEdit, classicList, classicAdd, classicEdit, signUp
// signUpAdd, signUpEdit
// student, studentList, studentListAdd, studentListEdit
// userSetting, user, addUser, editUser, role, addRole, editRole
