const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     //use the profile info to check if user is registered in db
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(null, profile);
//     // });
//   }
// ));

