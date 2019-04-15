const express = require("express");
const router = express.Router();

const Quiz = require("../models/quiz-model.js");
const QuizDetail = require("../models/quiz-detail-model.js");

router.use("/", (req, res, next) => {
  res.locals.data = req.user;
  res.locals.layout = "dashboard/dashboard-layout.hbs";
  next();
});

// route dashboard fin de creation du quiz
// TODO : Proposer un bouton pour y accéder dans un nouvelle onglet et afficher l'URL

// route dashboard new quiz
router.get("/new", (req, res, next) => {
  res.render("dashboard/quiz-form.hbs");
});

// Get our user's quizzes
router.get("/dashboard", (req, res, next) => {
  const currentUser = req.user._id;
  // whenever a user visits "/quizzes" find all the quizzes they have created so far
  Quiz.find({ userId: { $eq: currentUser } })
    .sort({ timestamp: -1 }) // how do we want them sorted ?
    .then(quizResults => {
      // send the database query results to the HBS file as "quizArray"
      res.locals.quizArray = quizResults;
      res.render("dashboard/dashboard-home.hbs"); // Maybe the corresponding view is named or to be named otherwise
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
      QuizDetail.find({ quizId: { $eq: quizId } })
        .then(quizDetailArray => {
          // send the query results to the HBS file as "quizItem"
          res.locals.cardList = quizDetailArray;
          res.render("dashboard/quiz-details.hbs");
        })
        //
        .catch(err => next(err));
    })
    //
    .catch(err => next(err));
});

// Create a new quizz
router.post("/process-quiz", (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  const userId = req.user._id;
  const { name, description, theme, url } = req.body;
  Quiz.create({ userId, name, description, theme, url })
    .then(quizDoc => {
      // redirect if it's successful
      // (redirect ONLY to addresses - not to HBS files)
      res.locals.quizItem = quizDoc;
      res.redirect(`/quiz/${quizDoc._id}`);
    })
    // next(err) skips to the rerror handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

// Create a new card (should return a card array)
router.post("/quiz/:quizId/process-card", (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  
  const { quizId } = req.params;
  // Maybe we don't get the answers and thruth as arrays and we will need to build it here
  const {
    question,
    firstAnswer,
    secondAnswer,
    thirdAnswer,
    fourthAnswer,
    firstTrue,
    secondTrue,
    thirdTrue,
    fourthTrue
  } = req.body;
  QuizDetail.create({
    quizId,
    question,
    options: [
      { option: firstAnswer, valid: firstTrue },
      { option: secondAnswer, valid: secondTrue },
      { option: thirdAnswer, valid: thirdTrue },
      { option: fourthAnswer, valid: fourthTrue }
    ]
  })
    .then(() => {
      QuizDetail.find({ quizId: { $eq: quizId } })
        .sort({ timestamp: -1 })
        .then(quizDetailArray => {
          // send the query results to the HBS file as "quizItem"
          res.locals.cardList = quizDetailArray;
          res.redirect(`/quiz/${quizId}`);
        })
        //
        .catch(err => next(err));
      // redirect if it's successful
      // (redirect ONLY to addresses - not to HBS files)
    })
    // next(err) skips to the rerror handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

module.exports = router;
