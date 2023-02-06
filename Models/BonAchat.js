module.exports = (db, type) => {
    return db.define('bonAchat', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      valeur: {type: type.FLOAT,allowNull: false},
    })
}