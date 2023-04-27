module.exports = (db, DataTypes) => {
    return  db.define('fournisseur',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      address : {type : DataTypes.STRING},
      ville :{type : DataTypes.STRING},
      telephone : {type : DataTypes.INTEGER},
      avatar :{type : DataTypes.STRING },
    });
  }