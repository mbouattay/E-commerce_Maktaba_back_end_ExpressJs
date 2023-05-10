module.exports = (db, DataTypes) => {
    return  db.define('bonAchat',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      solde : {type : DataTypes.FLOAT , allowNull: false},
      etat:{type : DataTypes.STRING , allowNull: false},
      createdAt:{type : DataTypes.DATEONLY}
    });
}