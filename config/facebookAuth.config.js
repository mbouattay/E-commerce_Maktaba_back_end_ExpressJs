const FacebookStrategy = require('passport-facebook').Strategy;
const Model = require("../Models/index");
const bcrypt = require('bcrypt');
module.exports = (passport) =>{
    passport.serializeUser(function (user, done) {
        done(null, user.id);
      });
      passport.deserializeUser(function (id, done) {
        Model.user.findOne({ where: { facbookId: id } }).then((user) => {
          done(null, user);
        });
      });
    passport.use(new FacebookStrategy({
        clientID: '1604717723305699',
        clientSecret: '30e875d896343ca22a5b9e605fd465b7',
        callbackURL: 'http://localhost:3000/user/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name'] 
      },
      function(accessToken, refreshToken, profile, cb) {
        Model.user
          .findOne({ where: { facbookId: profile.id } })
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
                  name_prenom: profile.name.familyName+" "+profile.name.givenName,
                  role: "client",
                  email_verifie: "verifie",
                  facbookId: profile.id,
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
      ));
}