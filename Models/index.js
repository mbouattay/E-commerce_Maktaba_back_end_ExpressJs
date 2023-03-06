const Sequelize = require("sequelize")
const db = require("../config/database")
const userModel = require("./user")
const clientModel = require ("./client")
const fournisseurModel = require("./fournisseur") 
const partenaireModel = require ("./partenaire")
const labrairieModel = require ("./labriarie")
const codePromoModel = require("./code_promo")
const bonAchatModel = require("./bonAchat")
const categorieModel = require("./categorie")
const produitModel = require ("./produit")
const produitlabrairieModel = require("./produitLabriarie")
const user = userModel(db, Sequelize)
const client =  clientModel (db,Sequelize)
const fournisseur = fournisseurModel (db, Sequelize)
const labrairie = labrairieModel (db,Sequelize)
const partenaire = partenaireModel (db,Sequelize)
const codePromo = codePromoModel(db,Sequelize)
const bonAchat = bonAchatModel(db,Sequelize)
const categorie = categorieModel(db,Sequelize)
const produit = produitModel(db,Sequelize)
const produitlabrairie = produitlabrairieModel(db,Sequelize)
// define relationships
user.hasOne(client,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
client.belongsTo(user)
user.hasOne(fournisseur,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
fournisseur.belongsTo(user)
user.hasOne(labrairie,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
labrairie.belongsTo(user)
user.hasOne(partenaire,{
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
partenaire.belongsTo(user)
user.hasMany(codePromo)
codePromo.belongsTo(user)
user.hasMany(bonAchat)
bonAchat.belongsTo(user)
partenaire.hasMany(bonAchat) 
bonAchat.belongsTo(partenaire)
categorie.hasMany(produit)
produit.belongsTo(categorie)
fournisseur.hasMany(produit)
produit.belongsTo(fournisseur)
categorie.hasMany(produitlabrairie)
produitlabrairie.belongsTo(categorie)
labrairie.hasMany(produitlabrairie)
produitlabrairie.belongsTo(labrairie)

db.sync({force:true}).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
    client,
    labrairie,
    fournisseur,
    partenaire,
    codePromo,
    bonAchat,
    categorie,
    produit,
    produitlabrairie
}