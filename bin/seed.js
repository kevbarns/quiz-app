require("dotenv").config();
const mongoose = require("mongoose");
// RUN CMD : npm run seed
// MODELS
const QuizDetail = require("../models/quiz-detail-model.js");
const Quiz = require("../models/quiz-model.js");
// DATA
const quizData = require("./quiz.json");
const quizDetailData = require("./quizDetail.json");

mongoose
  .connect("mongodb://localhost/quiz-app", {useNewUrlParser: true})
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Quiz.create(quizData)
  .then(quiz => {    
    console.log(`${quiz.length} document added to the database`);
    const quizId = quiz[0]._id;
    quizDetailData.forEach(oneRow => {
      const question = oneRow.question;
      const answer = oneRow.answer;
      const truth = oneRow.truth;
      QuizDetail.create({quizId, question, answer, truth})
        .then(quizDetail => {
          console.log(`${quizDetail} documents added to the database`);
        })
        .catch(err => {
          console.log(
            "Failed to insert Quiz Detail Data in the Quiz Detail Collection",
            err
          );
        });
    });
  })
  .catch(err => {
    console.log("Failed to insert Data in the Quiz Collection", err);
  });
