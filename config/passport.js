const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // Middleware
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // Strategies
  passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {
      User.findOne({ email })
        .then(user => {
          if (!user) { 
            return done(null, false, { message: 'The email is not registered.' }); 
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'The email or password is wrong.' });
            }
            return done(null, user)
          })
        })
      }
  ));
  // Sessions
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}