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
const commandeEnGrosModel = require("./commandeGros")
const ProduitCommandeEnGrosModel = require("./ProduitCommandeEnGros")
const ProduitCommandeEnDetailModel = require ("./ProduitCommandeEnDetail")
const commandeEnDetailModel = require ("./commandeDetail")
const codeClientModel = require("./codeClient")
const avisProduitlibraireModel = require("./avisProduitlibraire")
const signalerProduitlibraireModel = require ("./signalerProduitLibraire")
const adressesModel = require("./adresses")
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
const commandeEnGros = commandeEnGrosModel(db,Sequelize)
const ProduitCommandeEnGros = ProduitCommandeEnGrosModel(db,Sequelize)
const commandeEnDetail = commandeEnDetailModel(db,Sequelize)
const ProduitCommandeEnDetail = ProduitCommandeEnDetailModel(db,Sequelize)
const codeClient = codeClientModel(db,Sequelize)
const avisProduitlibraire = avisProduitlibraireModel(db,Sequelize)
const signalerProduitlibraire = signalerProduitlibraireModel(db,Sequelize)
const adresses  = adressesModel (db,Sequelize);
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
labrairie.hasMany(codePromo)
codePromo.belongsTo(labrairie)
partenaire.hasMany(codePromo)
codePromo.belongsTo(partenaire)
codePromo.belongsToMany(client,{ through:codeClient});
client.belongsToMany(codePromo,{ through:codeClient});
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
labrairie.hasMany(commandeEnGros)
commandeEnGros.belongsTo(labrairie)
fournisseur.hasMany(commandeEnGros)
commandeEnGros.belongsTo(fournisseur)
produit.belongsToMany(commandeEnGros, { through:ProduitCommandeEnGros});
commandeEnGros.belongsToMany(produit, { through:ProduitCommandeEnGros});
user.hasMany(commandeEnDetail);
commandeEnDetail.belongsTo(user);
labrairie.hasMany(commandeEnDetail)
commandeEnDetail.belongsTo(labrairie)
produitlabrairie.belongsToMany(commandeEnDetail , {through :ProduitCommandeEnDetail})
commandeEnDetail.belongsToMany(produitlabrairie , {through :ProduitCommandeEnDetail})
client.hasMany(avisProduitlibraire)
avisProduitlibraire.belongsTo(client)
produitlabrairie.hasMany(avisProduitlibraire)
avisProduitlibraire.belongsTo(produitlabrairie)
produitlabrairie.hasMany(signalerProduitlibraire)
signalerProduitlibraire.belongsTo(produitlabrairie)
user.hasMany(adresses)
adresses.belongsTo(user)
db.sync({force:false}).then(() => {
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
    produitlabrairie,
    commandeEnGros,
    ProduitCommandeEnGros,
    commandeEnDetail,
    ProduitCommandeEnDetail,
    codeClient,
    avisProduitlibraire,
    signalerProduitlibraire,
    adresses
}