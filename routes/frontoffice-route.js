const express = require('express');
const router  = express.Router();

/* GET home page */

// TODO : recover quiz - 
// TODO : display input for player name and save session

router.get('/', (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  if (req.user) {
    console.log("WE ARE LOGGED IN!", req.user);
  } else {
    console.log("NOT LOGGED IN!", req.user);
  }
  res.render("index");
});

// TODO : route - display quiz details
  // TODO : recover player selection and save
  // TODO : go to next question. if no next, display end of quiz

// TODO : route - end of quiz

module.exports = router;