module.exports = (db, DataTypes) => {
    return  db.define('code_Promo', {
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      code: {type : DataTypes.STRING },
      pourcentage : {type : DataTypes.INTEGER}
    });
}