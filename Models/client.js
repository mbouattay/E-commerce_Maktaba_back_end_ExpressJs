module.exports = (db, DataTypes) => {
    return  db.define('client',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    });
}