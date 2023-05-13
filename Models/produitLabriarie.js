module.exports = (db, DataTypes) => {
    return  db.define('produitlabrairie',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      titre : {type : DataTypes.STRING},
      description : {type : DataTypes.STRING},
      prix : { type : DataTypes.FLOAT},
      etat : {type : DataTypes.STRING},
      qte:{type: DataTypes.INTEGER},
      prix_en_Solde:{type: DataTypes.INTEGER},
      remise:{type: DataTypes.INTEGER},
      updatedAt:{type : DataTypes.DATEONLY}
    });
}