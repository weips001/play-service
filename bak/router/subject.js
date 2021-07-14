'use strict';

module.exports = app => {
  const {
    router,
    controller,
    jwt
  } = app;

  router.get('/api/subject', controller.subject.list);
  router.get('/api/subject/:id', jwt, controller.subject.get);
  router.post('/api/subject/add', controller.subject.add);
  router.put('/api/subject/:id', controller.subject.update);
  router.delete('/api/subject/:id', controller.subject.remove);
  router.get('/api/wrongsubject/:id', controller.subject.getWrongSubject);


  router.get('/api/subjectOne', controller.subject.listOne); // 科一 传参limit page
  router.get('/api/subjectFour', controller.subject.listFour); // 科四 传参limit page
  router.get('/api/subjectOneVip', controller.subject.listOneVip); // 科一 传参limit page
  router.get('/api/subjectFourVip', controller.subject.listFourVip); // 科四 传参limit page
  router.post('/api/subjectOne/wrong', controller.subject.wrongOne); // 科目一错题传过来一个id组成的数组
  router.post('/api/subjectFour/wrong', controller.subject.wrongFour); // 科目四错题传过来一个id组成的数组
  router.post('/api/subjectOne/collection', controller.subject.collectionOne); // 科目一收藏题目传过来一个id组成的数组
  router.post('/api/subjectFour/collection', controller.subject.collectionFour); // 科目四收藏题目传过来一个id组成的数组
  router.get('/api/mockSubjectOne', controller.subject.mockSubjectOne); // 科一模拟试卷 100道题 40道判断 60道单选
  router.get('/api/mockSubjectFour', controller.subject.mockSubjectFour); // 科四模拟试卷 50道题 20道判断 20到单选 10道多选
  router.get('/api/fiftysubjectOne', controller.subject.getFiftySubjectOne); // 科目一随机50题
  router.get('/api/fiftysubjectFour', controller.subject.getFiftySubjectFour); // 科目四随机50题
  router.get('/api/addSubjectOne', controller.subject.addSubjectOne); // 初始化试题
  router.get('/api/addSubjectFour', controller.subject.addSubjectFour); // 初始化试题
  router.get('/api/deleteAllSubject', controller.subject.deleteAllSubject); // 删除题库
  router.get('/api/deleteSubjectOne', controller.subject.deleteSubjectOne); // 删除题库
  router.get('/api/deleteSubjectFour', controller.subject.deleteSubjectFour); // 删除题库

  // 专项练习接口
};