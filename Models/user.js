module.exports = (db, DataTypes) => {
  return  db.define('user', {
    id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    email : {type : DataTypes.STRING , allowNull: false , validate: {isEmail: true , notEmpty: true}},
    password : {type : DataTypes.STRING , allowNull: false , validate: { notEmpty: true} },
    email_verifie : {type : DataTypes.STRING , allowNull: false ,validate: { notEmpty: true}},
    role : {type : DataTypes.STRING , allowNull: false ,validate: { notEmpty: true}}
  });
}