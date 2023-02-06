const express = require('express')
const router = express.Router()
const userController = require("../Controllers/User.Controllers")
router.post('/add',userController.create)
module.exports = router