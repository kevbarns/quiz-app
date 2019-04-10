const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: "Player"},
    quizId: {type: Schema.Types.ObjectId, ref: "Quiz"},
    quizDetailId: {type: Schema.Types.ObjectId, ref: ""},
    playerAnswers: {type: Array}
  },
  {timestamp: true}
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
