const express = require("express");
const router = express.Router();

const Quiz = require("../models/quiz-model.js");
const QuizDetail = require("../models/quiz-detail-model.js");
const User = require("../models/user-model.js");
/* GET home page */

// TODO : recover quiz -
// TODO : display input for player name and save session

// router.get("/:quizId", (req, res, next) => {
router.get("/quizId", (req, res, next) => {
  res.render("quiz-views/fe-quiz.hbs");
  // Quiz.findById(req.params)
  //   .then(quizData => {
  //     res.render("fe-quiz.hbs");
  //   })
  //   .catch(err => next(err));
});

router.post("/:quizId/process-player", (req, res, next) => {
  const {fullName} = req.body;
  const quizId = req.params;
  User.create({fullName})
    .then(userDoc => {
      // redirect to the HOME PAGE if the sign up WORKED
      req.logIn(userDoc, () => {
        userDoc.encryptedPassword = undefined;
        req.flash("success", "Sign up success! 😃");
        // TODO : redirect to dashboard homepage
        res.redirect(`${quizId}/quiz`);
      });
    })
    .catch(err => next(err));
});

// TODO : route - display quiz details
// TODO : recover player selection and save
// TODO : go to next question. if no next, display end of quiz
router.get("/:quizId/quiz", (req, res, next) => {
  const quizId = req.params;
  // Fetch all question
  QuizDetail.find({quizId: {eq: quizId}})
    .then(data => {
      res.locals.data = data;
      res.render("fe-quiz-play.hbs");
    })
    .catch(err => next(err));
});

// TODO : route - end of quiz
router.get("/:quizId/done", (req, res, next) => {
  const {fullName} = req.user;
  res.locals.user = fullName;
  res.render("fe-quiz-done.hbs");
});

module.exports = router;
