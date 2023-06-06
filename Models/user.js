module.exports = (db, DataTypes) => {
  return  db.define('user', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    email : {type : DataTypes.STRING , allowNull: false },
    password : {type : DataTypes.STRING , allowNull: false , validate: { notEmpty: true} },
    email_verifie : {type : DataTypes.STRING , allowNull: false ,validate: { notEmpty: true}},
    role :{type : DataTypes.STRING , allowNull: false ,validate: { notEmpty: true}},
    fullname : {type : DataTypes.STRING},
    avatar : {type :DataTypes.STRING},
    Date_de_naissance : {type : DataTypes.DATEONLY},
    telephone : {type : DataTypes.INTEGER},
    point :{type : DataTypes.INTEGER},
    etatCompte:{type :DataTypes.STRING},
    createdAt:{type : DataTypes.DATEONLY}
  });
}