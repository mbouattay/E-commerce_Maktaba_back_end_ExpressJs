module.exports = (db, type) => {
    return db.define('codePromo', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      code: {type: type.STRING,allowNull: false},
      pourcentage : {type: type.INTEGER,allowNull: false},
    })
}