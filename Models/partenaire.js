module.exports = (db, DataTypes) => {
    return  db.define('partenaire',{
      id: { type: DataTypes.INTEGER,primaryKey: true },
      address : {type : DataTypes.STRING },
      ville :{type : DataTypes.STRING},
      telephone : {type : DataTypes.INTEGER},
    });
}