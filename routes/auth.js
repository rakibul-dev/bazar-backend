const express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../services/user/UserModel");

const { registeUser } = require("../services/user/UserController");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const foundUser = await User.findOne({ username }).exec();
    // console.log({ foundUser });

    if (!foundUser) {
      return done(null, false);
    }

    const pasMatched = await bcrypt.compare(password, foundUser.password);
    // console.log({ pasMatched });
    if (pasMatched) {
      return done(null, foundUser);
    }
  })
);

passport.serializeUser((user, done) => {
  //   console.log("serializeUser ==================>", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //   console.log("deserializeUser ==================>", user);
  done(null, user);
});
// passport.deserializeUser((user, next) => {
//   console.log("deserializeUser", user);
//   next(null, user);
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/auth/user",
//     failureRedirect: "/",
//   })
// );

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  // console.log({ user: req.user });

  try {
    res.status(201).json(req.user);
  } catch (error) {}
});

router.get("/auth/external", (req, res) => {
  const externalURL = "http://example.com";
  res.redirect(externalURL);
});

router.post("/user/register", registeUser);

module.exports = router;
