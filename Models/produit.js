module.exports = (db, DataTypes) => {
    return  db.define('produit', {
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      name: {type : DataTypes.STRING },
      description : { type : DataTypes.STRING},
      prix : {type : DataTypes.FLOAT},
      Qte : {type : DataTypes.INTEGER}, 
      prix_G : {type : DataTypes.FLOAT},
      image : {type : DataTypes.STRING}
    });
}