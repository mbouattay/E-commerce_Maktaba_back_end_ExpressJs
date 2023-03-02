const Sequelize = require("sequelize")
const db = require("../config/database")
const userModel = require("./user")
const categorieModel = require("./categorie")
const produitModel = require("./produit")
const donsModel = require ("./dons")
const code_PromoModel = require ("./code_promo")
const clientModel = require ("./client")
const fournisseurModel = require("./fournisseur") 
const partenaireModel = require ("./partenaire")
const labrairieModel = require ("./labriarie")
const user = userModel(db, Sequelize)
const client =  clientModel (db,Sequelize)
const fournisseur = fournisseurModel (db, Sequelize)
const labrairie = labrairieModel (db,Sequelize)
const partenaire = partenaireModel (db,Sequelize)
const categorie = categorieModel(db,Sequelize)
const produit = produitModel(db,Sequelize) ;
const dons = donsModel(db,Sequelize) ; 
const code_Promo = code_PromoModel(db,Sequelize)
// define relationships
user.hasMany(client,{
  foreignKey : {
    name :'userId',
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
client.belongsTo(user,{
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
user.hasMany(fournisseur,{
  foreignKey : {
    name : 'userId'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
fournisseur.belongsTo(user)
user.hasMany(labrairie,{
  foreignKey : {
    name : 'userId'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
labrairie.belongsTo(user)
user.hasMany(partenaire,{
  foreignKey : {
    name :'userId'
  },
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
partenaire.belongsTo(user)

categorie.hasMany(produit , {
    foreignKey: {
      name:'categorieId'
    }
});
produit.belongsTo(categorie);
// creation de table 
db.sync({ force: true }).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
    client,
    labrairie,
    fournisseur,
    partenaire,
    categorie,
    produit,
    dons,
    code_Promo
}