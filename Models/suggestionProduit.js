module.exports = (db, DataTypes) => {
    return  db.define('suggestionProduit',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      Titre : {type : DataTypes.STRING},
      Description:{type : DataTypes.STRING},
      image : {type : DataTypes.STRING},
      etat:{type : DataTypes.STRING},
      createdAt:{type : DataTypes.DATEONLY}
    });
}