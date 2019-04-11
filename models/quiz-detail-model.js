const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizDetailSchema = new Schema(
  {
    quizId: {type: Schema.Types.ObjectId, ref: "Quiz"},
    question: {type: String, required: true},
    answer: {type: Array},
    truth: {type: Array, required: true},
    options: [
      {type: Object}
    ]
  },
  {
    timestamp: true
  }
);

const QuizDetail = mongoose.model("QuizDetail", quizDetailSchema);

module.exports = QuizDetail;
