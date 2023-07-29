const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Employee = require('../models/employee');


// tell passport to use a new strategy for google login

passport.use(
  new googleStrategy(
    {
      clientID: "529756550109-eqbr857t58b5n6jid62asa7u9v4lq51t.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5555/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("access token ===>",accessToken);
        // Find a user in the database
        const employee = await Employee.findOne({ email: profile.emails[0].value });

        if (employee) {
          // If user found, set this user as req.user
          return done(null, employee);
        } else {
          // If user not found, create the user and set it as req.user
          const newEmployee = await Employee.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          });

          return done(null, newEmployee);
        }
      } catch (err) {
        console.log('Error in Google Strategy-Passport:', err);
        return done(err, null);
      }
    }
  )
);


module.exports = passport;