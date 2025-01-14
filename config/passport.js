const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const user = await User.findOne({ email });
        console.log("Here is profile: ", profile);

        if (user) {
          // Check if this provider is already linked
          const existingProvider = user.authProviders.find(
            (p) => p.provider === "google" && p.providerId === profile.id
          );

          if (!existingProvider) {
            // Add new provider details
            user.authProviders.push({
              provider: "google",
              providerId: profile.id,
              email,
            });

            await user.save();
          }

          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName,
          email,
          avatar: profile.photos?.[0]?.value,
          authProviders: [
            {
              provider: "google",
              providerId: profile.id,
              email,
            },
          ],
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "email"], // Specify required fields
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({
//           providerId: profile.id,
//           provider: "facebook",
//         });
//         if (existingUser) return done(null, existingUser);

//         const newUser = await User.create({
//           name: profile.displayName,
//           email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`, // Fallback for email
//           avatar: profile.photos?.[0]?.value,
//           provider: "facebook",
//           providerId: profile.id,
//         });

//         return done(null, newUser);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// // GitHub Strategy
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/api/auth/github/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({
//           providerId: profile.id,
//           provider: "github",
//         });
//         if (existingUser) return done(null, existingUser);

//         const newUser = await User.create({
//           name: profile.displayName || profile.username,
//           email: profile.emails?.[0]?.value || `${profile.id}@github.com`, // Fallback for email
//           avatar: profile.photos?.[0]?.value,
//           provider: "github",
//           providerId: profile.id,
//         });

//         return done(null, newUser);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

module.exports = passport;
