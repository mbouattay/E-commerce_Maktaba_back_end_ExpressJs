module.exports = (db, DataTypes) => {
    return  db.define('Souscategorie',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      name:{type : DataTypes.STRING , allowNull: false},
      Description:{type : DataTypes.STRING},
    });
}