module.exports = (db, DataTypes) => {
    return  db.define('produit',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      description : {type : DataTypes.STRING},
      image:{type : DataTypes.STRING,allowNull: false},
      prix : { type : DataTypes.FLOAT}, 
      Qte:{ type : DataTypes.INTEGER},
      etat : {type : DataTypes.STRING}  
    });
}