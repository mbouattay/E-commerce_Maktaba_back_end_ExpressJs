module.exports = (db, DataTypes) => {
    return  db.define('labrairie', {
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      address : {type : DataTypes.STRING},
      ville :{type : DataTypes.STRING },
      telephone : {type : DataTypes.INTEGER},
      facebook : {type : DataTypes.STRING},
      instagram : {type : DataTypes.STRING},
      avatar :{type : DataTypes.STRING },
    });
}