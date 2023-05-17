module.exports = (db, DataTypes) => {
    return  db.define('Admin',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    });
}