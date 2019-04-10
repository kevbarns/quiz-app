const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, originalPassword } = req.body;

  // enforce password rules (can't be empty and MUST have a digit)
  if (!originalPassword || !originalPassword.match(/[0-9]/)) {
    req.flash("error", "Password can't be blank and must contain a number.");
    res.redirect("/signup");
    return;
  }

  // encrypt the user's password before saving it
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(() => {
      // redirect to the HOME PAGE if the sign up WORKED
      req.flash("success", "Sign up success! 😃");
      res.redirect("/");
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "Email is incorrect.");
        res.redirect("/login");
        return;
      }

      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        req.flash("error", "Password is incorrect.");
        res.redirect("/login");
        return;
      }
      req.logIn(userDoc, () => {
        req.flash("success", "Log in success!");
        res.redirect("/");
      });
    })
    .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success", "Logged out successfully!");
  res.redirect("/");
});

module.exports = router;
