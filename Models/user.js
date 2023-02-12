module.exports = (db, DataTypes) => {
  return  db.define('user', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    email : {type : DataTypes.STRING },
    password : {type : DataTypes.STRING },
    address : {type : DataTypes.STRING },
    ville :{type : DataTypes.STRING  },
    point : {type : DataTypes.INTEGER  },
    telephone : {type : DataTypes.INTEGER },
    name : {type : DataTypes.STRING},
    prenom : {type : DataTypes.STRING},
    email_verifie : {type : DataTypes.STRING},
    role : {type : DataTypes.STRING},
    googleId: {type : DataTypes.STRING},
    secret : {type : DataTypes.STRING}
  });
}