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
const codePromoRouter = require ("./router/codePromo.router")
const bonAchatRouter = require("./router/bonAchat.router")
const labrairieRouter = require("./router/labriarie.router")
const partenaireRouter = require("./router/partenaire.router")
const fournisseurRouter = require("./router/fournisseur.router")
const categorieRouter = require ("./router/categorie.router")
const produitRouter = require ("./router/produit.router")
const produitLabrairieRouter = require ("./router/produitLabrairie.router")
const commandeEnGrosRouter = require("./router/commandeGros.router")
const commandeEnDetail = require("./router/commandeDetail.router")
const codeClient = require("./router/codeClient.router")
app.use("/user",userRouter)
app.use("/client",clientRouter)
app.use("/codePromo",codePromoRouter)
app.use("/bonAchat",bonAchatRouter)
app.use("/labrairie",labrairieRouter)
app.use("/partenaire",partenaireRouter)
app.use("/fournisseur",fournisseurRouter)
app.use("/categorie",categorieRouter)
app.use("/produit",produitRouter)
app.use("/produitLabrairie",produitLabrairieRouter)
app.use("/commandeengros",commandeEnGrosRouter)
app.use("/commandeDetail",commandeEnDetail)
app.use("/codeClinet",codeClient)
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