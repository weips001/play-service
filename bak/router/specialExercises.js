'use strict';

module.exports = app => {
  const {
    router,
    controller
  } = app;

  router.get('/api/distanceOne', controller.specialExercises.distanceOne); // 距离题
  router.get('/api/fineOne', controller.specialExercises.fineOne); // 罚款题
  router.get('/api/speedOne', controller.specialExercises.speedOne); // 速度题
  router.get('/api/markingLineOne', controller.specialExercises.markingLineOne); // 标线题
  router.get('/api/gestureOne', controller.specialExercises.gestureOne); // 手势题
  router.get('/api/signalLampOne', controller.specialExercises.signalLampOne); // 信号灯题
  router.get('/api/deductionOne', controller.specialExercises.deductionOne); // 计分题
  router.get('/api/lightingOne', controller.specialExercises.lightingOne); // 灯光题

  // 专项练习接口

  router.get('/api/timeFour', controller.specialExercises.timeFour); // 时间题
  router.get('/api/distanceFour', controller.specialExercises.distanceFour); // 距离题
  router.get('/api/speedFour', controller.specialExercises.speedFour); // 速度题
  router.get('/api/markingLineFour', controller.specialExercises.markingLineFour); // 标线题
  router.get('/api/gestureFour', controller.specialExercises.gestureFour); // 手势题
  router.get('/api/signalLampFour', controller.specialExercises.signalLampFour); // 信号灯题
  router.get('/api/drunkDrivingFour', controller.specialExercises.drunkDrivingFour); // 酒驾题
  router.get('/api/lightingFour', controller.specialExercises.lightingFour); // 灯光题  
};