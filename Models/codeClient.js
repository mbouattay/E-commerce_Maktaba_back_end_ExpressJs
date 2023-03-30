module.exports = (db, DataTypes) => {
    return  db.define('codeClient',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
    });
}