const Sequelize = require("sequelize")
const db = require("../config/database")
const userModel = require("./user")
const user = userModel(db, Sequelize)
// define relationships
db.sync({ force: true }).then(() => {
    console.log("Tables Created!")
})
module.exports = {
    user,
}