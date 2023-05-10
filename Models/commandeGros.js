module.exports = (db, DataTypes) => {
    return  db.define('commandeEnGros',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      total_ttc : {type : DataTypes.FLOAT , allowNull: false},
      etat:{type : DataTypes.STRING , allowNull: false},
      createdAt:{type : DataTypes.DATEONLY}
    });
}