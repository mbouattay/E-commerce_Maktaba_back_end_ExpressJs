module.exports = (db, DataTypes) => {
    return  db.define('client',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      address : {type : DataTypes.STRING},
      ville :{type : DataTypes.STRING},
      point : {type : DataTypes.INTEGER},
      telephone : {type : DataTypes.INTEGER},
      fullname : {type : DataTypes.STRING},
    });
}