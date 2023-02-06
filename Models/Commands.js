module.exports = (db, type) => {
    return db.define('commande', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      total_prix: {type: type.FLOAT,allowNull: false},
      etat: {type: type.STRING,allowNull: false},
    })
}