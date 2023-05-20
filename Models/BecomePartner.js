module.exports = (db, DataTypes) => {
    return  db.define('BecomePartner',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      fullname : {type : DataTypes.STRING},
      email :{type : DataTypes.STRING},
      phone :{type : DataTypes.STRING},
      Role :{type : DataTypes.STRING},
      name_work:{type : DataTypes.STRING},
      file:{type :DataTypes.STRING},
      links:{type :DataTypes.STRING},
      detail:{type :DataTypes.STRING},
      pack:{type :DataTypes.STRING},
      etat:{type :DataTypes.STRING}
    });
}