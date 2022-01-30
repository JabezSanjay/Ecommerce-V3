const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        User.findOne({
          email: profile.emails[0].value,
        }).then((user) => {
          if (user) {
            next(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              active: true,
            });
            newUser.save({ validateBeforeSave: false }).then((user) => {
              next(null, user);
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  )
);
