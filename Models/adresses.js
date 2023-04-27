module.exports = (db, DataTypes) => {
    return  db.define('adresses',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      Nom_de_adresse : {type : DataTypes.STRING},
      Adresse :{type : DataTypes.STRING},
      Gouvernorat :{type : DataTypes.STRING},
      Ville:{type : DataTypes.STRING},
      Code_postal:{type :DataTypes.INTEGER}
    });
}