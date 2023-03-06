module.exports = (db, DataTypes) => {
    return  db.define('produitlabrairie',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      description : {type : DataTypes.STRING},
      image:{type : DataTypes.STRING,allowNull: false},
      prix : { type : DataTypes.FLOAT},
      etat : {type : DataTypes.STRING}
    });
}