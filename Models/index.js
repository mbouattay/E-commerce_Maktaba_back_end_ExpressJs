const Sequelize = require("sequelize")
const db = require("../config/database")
const userModel = require("./user")
const categorieModel = require("./categorie")
const produitModel = require("./produit")
const donsModel = require ("./dons")
const code_PromoModel = require ("./code_promo")
const user = userModel(db, Sequelize)
const categorie = categorieModel(db,Sequelize)
const produit = produitModel(db,Sequelize) ;
const dons = donsModel(db,Sequelize) ; 
const code_Promo = code_PromoModel(db,Sequelize)
// define relationships
categorie.hasMany(produit);
produit.belongsTo(categorie);
user.hasMany(produit);
produit.belongsTo(user);
user.hasMany(dons);
dons.belongsTo(user);
user.hasMany(code_Promo);
dons.belongsTo(user);
// creation de table 
db.sync({ force: false }).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
    categorie,
    produit,
    dons,
    code_Promo
}