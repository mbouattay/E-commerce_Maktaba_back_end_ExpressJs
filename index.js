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
require('./security/passport')(passport)
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