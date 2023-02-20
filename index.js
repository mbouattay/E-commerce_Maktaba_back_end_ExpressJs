const express = require('express')
const bodyParser = require('body-parser')
const passport = require("passport");
const session = require("express-session");
const app = express()
const db = require('./config/database') ;
require('dotenv').config()
const port = process.env.PORT 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/googleAuth.config")(passport);
require('./security/passport')(passport)
require("./config/facebookAuth.config")(passport)
/** test auth facebook  */
/*const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: '1604717723305699',
  clientSecret: '30e875d896343ca22a5b9e605fd465b7',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name'] 
},
function(accessToken, refreshToken, profile, done) {
  // ...
  console.log(profile)
  return done(null, profile);
}
));
app.get('/auth/facebook',passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));*/

/** end auth with facebook  */
/** les router */
const userRouter= require("./router/user.router")
const clientRouter = require ("./router/client.router")
const categorieRouter = require("./router/categorie.router")
const produitRouter = require ("./router/produit.router")
const donsRouter = require("./router/dons.router")
app.use("/user",userRouter)
app.use("/client",clientRouter)
app.use("/categorie", categorieRouter)
app.use("/produit",produitRouter)
app.use("/dons",donsRouter)
/** end  */
/** connection avec DB */
db.authenticate().then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })
/**end  */  
app.listen(port, () => console.log(`server running on port ${port}`)) 