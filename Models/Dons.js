module.exports = (db, type) => {
    return db.define('dons', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      discription: {type: type.STRING,allowNull: false},
      image: {type: type.STRING,allowNull: false},
      etat: {type: type.STRING,allowNull: false}
    })
}