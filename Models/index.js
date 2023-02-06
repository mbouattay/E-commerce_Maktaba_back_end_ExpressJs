const Sequelize = require("sequelize")
const db = require ("../config/database")
const userModel =  require("./user")
const produitModel = require("./produit")
const donsModel = require("./Dons")
const commandsModel = require ("./Commands")
const colisModel = require ("./Colis")
const codePromoModel = require("./CodePromo")
const BonAchatModel = require ("./BonAchat")
const categorieModel = require("./Categories")
// create models
 const user = userModel(db,Sequelize)
 const produit = produitModel(db,Sequelize)
 const dons = donsModel(db,Sequelize)
 const commande = commandsModel(db,Sequelize)
 const colis = colisModel(db,Sequelize)
 const codePromo = codePromoModel(db,Sequelize)
 const bonAchat = BonAchatModel(db,Sequelize)
 const categorie = categorieModel(db,Sequelize)
 // define relationships
/*user.hasMany(Student, { as: 'students' });
  Person.hasMany(Teacher, { as: 'teachers' });*/
  categorie.hasMany(produit)
  produit.belongsTo(categorie)
  user.hasMany(bonAchat)
  bonAchat.belongsTo(user)
  user.hasMany(codePromo)
  codePromo.belongsTo(user)
  user.hasMany(dons)
  dons.belongsTo(user)
  user.hasMany(produit)
  produit.belongsTo(user)
  user.hasMany(commande)
  commande.belongsTo(user)
  commande.belongsToMany(produit, { through: 'ProduitCommandes' });
  produit.belongsToMany(commande, { through: 'ProduitCommandes' }); 
  user.hasMany(colis)
  colis.belongsTo(user)
  commande.hasOne(colis);
  colis.belongsTo(commande);
// generate tables in DB
 db.sync({ force: false }).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
    produit,
    dons,
    commande,
    colis,
    codePromo,
    bonAchat,
    categorie
  }