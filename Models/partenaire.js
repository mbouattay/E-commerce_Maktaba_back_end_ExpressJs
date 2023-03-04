module.exports = (db, DataTypes) => {
    return  db.define('partenaire',{
      id: { type: DataTypes.INTEGER,primaryKey: true },
      address : {type : DataTypes.STRING },
      ville :{type : DataTypes.STRING},
      point : {type : DataTypes.INTEGER},
      telephone : {type : DataTypes.INTEGER},
    });
}