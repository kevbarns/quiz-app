const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref:"User"},
    name: {type: String, minlength: 2},
    description: {type: String},
    theme: {
      type: String,
      required: true,
      enum: ["Classic", "Survey", "Other"],
      default: "Classic"
    },
    url: {type: String}
  },
  {
    timestamps: true
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
