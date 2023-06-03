module.exports = (db, DataTypes) => {
    return  db.define('cataloge',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      titre : {type : DataTypes.STRING , allowNull: false},
      description:{type : DataTypes.STRING , allowNull: false},
      prix :{type : DataTypes.FLOAT},
      etat:{type : DataTypes.STRING ,allowNull: false},
      createdAt:{type : DataTypes.DATEONLY},
      
    });
}