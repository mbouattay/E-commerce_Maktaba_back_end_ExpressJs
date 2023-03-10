module.exports = (db, DataTypes) => {
    return  db.define('produit',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      titre : {type : DataTypes.STRING},
      description : {type : DataTypes.STRING},
      image:{type : DataTypes.STRING,allowNull: false},
      prix : { type : DataTypes.FLOAT}, 
      prix_en_gros : { type : DataTypes.FLOAT}, 
      Qte:{ type : DataTypes.INTEGER},
      etat : {type : DataTypes.STRING}  
    });
}