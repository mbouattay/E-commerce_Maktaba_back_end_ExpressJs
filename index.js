const express = require('express')
const bodyParser = require('body-parser')
const passport = require("passport");
const session = require("express-session");
const app = express()
require('dotenv').config()
const port = process.env.PORT 
const db = require('./config/database') ;
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize());
require("./config/googleAuth.config")(passport);
const userRouter= require("./router/user.router")
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/user",userRouter)
db.authenticate().then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })
app.listen(port, () => console.log(`server running on port ${port}`)) 