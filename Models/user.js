module.exports = (db, DataTypes) => {
  return  db.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email : {type : DataTypes.STRING , allowNull: false},
    password : {type : DataTypes.STRING , allowNull: false},
    address : {type : DataTypes.STRING , allowNull: true},
    ville : {type : DataTypes.STRING , allowNull: true},
    role : {type : DataTypes.STRING , allowNull: false},
    nom : {type : DataTypes.STRING , allowNull: false},
    prenom : {type : DataTypes.STRING , allowNull: false},
    point : {type : DataTypes.STRING , allowNull: true},
    code_postal : {type : DataTypes.INTEGER , allowNull: true},
  });
}