module.exports = (db, DataTypes) => {
    return  db.define('client',{
      id: { type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true },
      Date_de_naissance : {type : DataTypes.DATE},
      telephone : {type : DataTypes.INTEGER},
    });
}