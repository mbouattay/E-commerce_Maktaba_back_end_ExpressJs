module.exports = (db, DataTypes) => {
    return  db.define('partenaire',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      address : {type : DataTypes.STRING ,allowNull: false,validate: { notEmpty: true} },
      ville :{type : DataTypes.STRING , allowNull: false,validate: { notEmpty: true}  },
      point : {type : DataTypes.INTEGER , allowNull: false,validate: { notEmpty: true}  },
      telephone : {type : DataTypes.INTEGER , allowNull: false ,validate: { notEmpty: true}},
      fullname : {type : DataTypes.STRING, allowNull: false,validate: { notEmpty: true}},
    });
}