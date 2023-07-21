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
const commandeEnDetailModel = require ("./CommandeDetail")
const codeClientModel = require("./codeClient")
const avisProduitlibraireModel = require("./avisProduitlibraire")
const signalerProduitlibraireModel = require ("./signalerProduitLibraire")
const adressesModel = require("./adresses")
const imageProduitLibrairieModel = require("./imageProduitLibrairie")
const imageCatalogeModel=require("./imageCataloge")
const produitFavorieModel = require("./produitFavorie")
const BecomePartnerModel = require("./BecomePartner")
const adminModel = require("./admin")
const catalogeModel = require("./cataloge")
const suggestionProduitModel=require("./suggestionProduit")
const SouscategorieModel = require("./sousCategorie")
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
const imageProduitLibrairie = imageProduitLibrairieModel(db,Sequelize)
const imageCataloge=imageCatalogeModel(db,Sequelize)
const produitFavorie = produitFavorieModel(db,Sequelize)
const admin=adminModel(db,Sequelize)
const BecomePartner = BecomePartnerModel(db,Sequelize)
const cataloge=catalogeModel(db,Sequelize)
const suggestionProduit = suggestionProduitModel(db,Sequelize)
const Souscategorie = SouscategorieModel(db,Sequelize)
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
user.hasOne(admin,{
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
admin.belongsTo(user)
labrairie.hasMany(codePromo)
admin.hasMany(cataloge)
cataloge.belongsTo(admin)
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
client.hasMany(adresses)
adresses.belongsTo(client)
produitlabrairie.hasMany(imageProduitLibrairie,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
imageProduitLibrairie.belongsTo(produitlabrairie)
cataloge.hasMany(imageCataloge,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
imageCataloge.belongsTo(cataloge)
categorie.hasMany(cataloge)
cataloge.belongsTo(categorie)
user.hasMany(produitFavorie)
produitFavorie.belongsTo(user)
produitlabrairie.hasMany(produitFavorie)
produitFavorie.belongsTo(produitlabrairie)
admin.hasMany(BecomePartner)
BecomePartner.belongsTo(admin)
user.hasMany(suggestionProduit)
suggestionProduit.belongsTo(user)
categorie.hasMany(Souscategorie)
Souscategorie.belongsTo(categorie)
Souscategorie.hasMany(suggestionProduit)
suggestionProduit.belongsTo(Souscategorie)
categorie.hasMany(suggestionProduit)
suggestionProduit.belongsTo(categorie)
Souscategorie.hasMany(produitlabrairie)
produitlabrairie.belongsTo(Souscategorie)
Souscategorie.hasMany(cataloge)
cataloge.belongsTo(Souscategorie)
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
    produitlabrairie,
    commandeEnGros,
    ProduitCommandeEnGros,
    commandeEnDetail,
    ProduitCommandeEnDetail,
    codeClient,
    avisProduitlibraire,
    signalerProduitlibraire,
    adresses,
    imageProduitLibrairie,
    produitFavorie,
    admin,
    BecomePartner,
    cataloge,
    imageCataloge,
    suggestionProduit,
    Souscategorie
}