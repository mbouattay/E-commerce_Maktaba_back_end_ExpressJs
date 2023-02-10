const userController = require("../Controllers/user.controller")
const express = require ("express")
const router = express.Router() ;
router.post("/register",userController.register)
router.get("/verif/:email",userController.emailVerification)
router.post("/login",userController.login)
module.exports = router ;  