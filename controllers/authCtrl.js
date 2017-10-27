'use strict';

const passport = require('passport');

// creating new users
module.exports.displayRegister = (req, res) => {
  res.render('register');
};

module.exports.register = (req, res, next) => {
  if (req.body.password === req.body.confirmation) {

    // first argument is name of the passport strategy we created in passport-strat.js
    passport.authenticate('local-signup', (err, user, msgObj) => {
      if (err) {  console.log(err); } //or return next(err)
      if (!user) { return res.render('register', msgObj); }
      // Go ahead and login the new user once they are signed up
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        // Save a msg in a cookie whose value will be added to req
        // using https://www.npmjs.com/package/express-flash-2 docs, but installed express-flash
        req.flash('registerMsg', `Thanks for signing up, ${user.first_name}!`);
        res.redirect('/');
      });
    })(req, res, next);
  } else {
    res.render('register', { message: 'Password & password confirmation do not match' })
  }
};

// logging in existing users
module.exports.displayLogin = (req, res, next) => {
  res.render('login');
};

module.exports.login = (req, res, next) => {
  // Note we're using different strategy, this time for logging in
  passport.authenticate('local-signin', (err, user, msgObj) => {
    // If login fails, the error is sent back by the passport strategy as { message: "some msg"}
    console.log('error msg?', msgObj);

    if (err) {  console.log(err) } //or return next(err) once handler set up in app.js
    if (!user) {
      return res.render('login', msgObj)
    }

    req.logIn(user, err => {
      if (err) { return next(err) }
      req.flash('welcomeBackMsg',`Welcome back, `);
      res.redirect('/');
    });
  })(req, res, next);
};

// logging out
module.exports.logout = (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};
