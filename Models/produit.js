module.exports = (db, type) => {
    return db.define('produit', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      name: {type: type.STRING,allowNull: false},
      prix: {type: type.FLOAT,allowNull: false},
      photo: {type: type.STRING,allowNull: false},
      prix_gros: {type: type.FLOAT,allowNull: false},
      quantité :{type: type.FLOAT,allowNull: false}
    })
  }