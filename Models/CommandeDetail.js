module.exports = (db, DataTypes) => {
    return  db.define('commandeEnDetail',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      total_ttc : {type : DataTypes.FLOAT , allowNull: false},
      etat:{type : DataTypes.STRING , allowNull: false},
      createdAt:{type : DataTypes.DATEONLY},
      data_acceptation:{type:DataTypes.DATEONLY},
      Data_rejetée:{type:DataTypes.DATEONLY},
      Date_préparée:{type:DataTypes.DATEONLY}
    });
}