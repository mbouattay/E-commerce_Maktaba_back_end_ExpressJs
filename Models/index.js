const Sequelize = require("sequelize")
const db = require("../config/database")
const userModel = require("./user")
const categorieModel = require("./categorie")
const produitModel = require("./produit")
const user = userModel(db, Sequelize)
const categorie = categorieModel(db,Sequelize)
const produit = produitModel(db,Sequelize) ; 
// define relationships
categorie.hasMany(produit);
produit.belongsTo(categorie);
user.hasMany(produit);
produit.belongsTo(user);
db.sync({ force: false }).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
    categorie,
    produit
}