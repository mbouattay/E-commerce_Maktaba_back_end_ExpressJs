const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Model = require("../Models/index");
const bcrypt = require('bcrypt');
module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    Model.user.findOne({ where: { googleId: id } }).then((user) => {
      done(null, user);
    });
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/user/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        Model.user
          .findOne({ where: { googleId: profile.id } })
          .then(async (user) => {
            try {
              if (user === null) {
                const characters =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let Password = "";
                for (let i = 0; i < 25; i++) {
                  Password +=
                    characters[Math.floor(Math.random() * characters.length)];
                }
                const passwordHash = bcrypt.hashSync(Password, 10);
                let dataUser = {
                  email: profile.emails[0].value,
                  password:passwordHash,
                  name: profile.name.familyName,
                  prenom: profile.name.givenName,
                  role: "client",
                  email_verifie: "verifie",
                  googleId: profile.id,
                  secret: accessToken,
                };
                await Model.user.create(dataUser).then((result) => {
                  return cb(null, result);
                });
              } else {
                return cb(null, user);
              }
            } catch (err) {
              return cb(err, user);
            }
          });
      }
    )
  );
};
