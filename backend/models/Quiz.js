const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  timeLimit: Number,
  questions: [questionSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);
