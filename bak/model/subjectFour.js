'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SubjectFourSchema = new Schema({
    id: String,
    question: String,
    topicIndex: Number,
    a: String,
    b: String,
    c: String,
    d: String,
    ta: String,
    imageurl: String,
    bestanswer: String,
    bestanswerid: String,
    Type: String,
    sinaimg: String,
    options: Array,
  });
  return mongoose.model('SubjectFour', SubjectFourSchema);
};