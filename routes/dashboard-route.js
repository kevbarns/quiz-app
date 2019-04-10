const express = require('express');
const router  = express.Router();

const Quiz = require("../models/quiz-model.js");

// Get our user's quizzes
router.get("/quizzes", (req, res, next) => {
  const currentUser = req.user._id;
  // whenever a user visits "/quizzes" find all the quizzes they have created so far
  Quiz.find({ userId: { $eq: currentUser }})
    .sort({ timestamp: -1 }) // how do we want them sorted ?
    .then(quizResults => {
      // send the database query results to the HBS file as "quizArray"
      res.locals.quizArray = quizResults;
      res.render("quiz-list.hbs"); // Maybe the corresponding view is named or to be named otherwise
    })
    // next(err) skips to the error handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});


// Get one quiz
// ##################################################
// Maybe we want to edit the quiz details from here ?
// ##################################################
router.get("/quiz/:quizId", (req, res, next) => {
  const { quizId } = req.params;
  // find the quiz in the database using the ID passed as a path parameter
  Quiz.findById(quizId)
    .then(quizDoc => {
      // send the query results to the HBS file as "quizItem"
      res.locals.quizItem = quizDoc;
      res.render("quiz-details.hbs");
    })
    //
    .catch(err => next(err));
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