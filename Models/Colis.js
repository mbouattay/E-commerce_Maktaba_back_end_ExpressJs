module.exports = (db, type) => {
    return db.define('colis', {
      id: {type: type.INTEGER,autoIncrement: true,primaryKey: true},
      data_livrison: {type: type.DATE,allowNull: false},
      etat: {type: type.STRING,allowNull: false},
    })
}