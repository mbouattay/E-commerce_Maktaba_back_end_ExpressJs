module.exports = (db, DataTypes) => {
    return  db.define('produitFavorie',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    });
}