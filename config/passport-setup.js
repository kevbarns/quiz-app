const passport = require("passport");

const User = require("../models/user-model.js");

// serializeUser: defines what data to save  data to save in the session
// (this happens when you log in successfully)
passport.serializeUser((userDoc, done) => {
  // userDoc is the result of our log in function
  // call done() to give Passport the result of the function

  // null as the first argument means NO ERROR OCCURED
  // user's ID as the second argument is the RESULT we send Passport
  done(null, userDoc);
});

// serializeUser: defines how to retrieve the user information from the DB
// (happens automatically on EVERY request once you are LOGGED IN)
passport.deserializeUser((userId, done) => {
  // userId is the result of serializeUser
  // call done() to give Passport the result

  User.findById(userId)
    .then(userDoc => {
      // null as the first argument means NO ERRORS OCCURES
      // DB document as the second argument is the RESULT we send Passport
      done(null, userDoc);
    })
    // err as the argument means we tell Passport there was an error
    .catch(err => done(err));
});
