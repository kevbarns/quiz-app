const express = require("express");
const router = express.Router();

const Quiz = require("../models/quiz-model.js");


/* GET home page */
router.get("/", (req, res, next) => {
  if (req.user) {
    // whenever a user visits "/quizzes" find all the quizzes they have created so far
    Quiz.find({ userId: { $eq: req.user._id }})
      .then(quizResults => {
        // send the database query results to the HBS file as "quizArray"
        res.locals.quizArray = quizResults;
        res.render("index.hbs");
      })
      // next(err) skips to the error handler in "bin/www" (error.hbs)
      .catch(err => next(err));
  } else {
    res.render("index.hbs");
  }
  
});

module.exports = router;


