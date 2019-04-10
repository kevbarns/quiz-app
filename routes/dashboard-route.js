const express = require('express');
const router  = express.Router();

const Quiz = require("../models/quiz-model.js");
const QuizDetail = require("../models/quiz-detail-model.js");

/* GET home page */
router.get('/', (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  if (req.user) {
    console.log("WE ARE LOGGED IN!", req.user);
  } else {
    console.log("NOT LOGGED IN!", req.user);
  }
  res.render("index");
});


// Create a new quizz
router.post("/process-quiz", (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  const { userId } = req.user
  const { name, description, theme, url } = req.body;
  // res.json(req.body);
  Quiz.create({ userId,  name, description, theme, url })
    .then(quizDoc => {
      // redirect if it's successful
      // (redirect ONLY to addresses - not to HBS files)
      res.redirect(`/quiz/${quizDoc._id}`);
    })
    // next(err) skips to the rerror handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});


module.exports = router;