const userController = require("../Controllers/user.controller");
const express = require("express");
const router = express.Router();
const upload = require ("../middleware/upload")
router.post("/register", userController.register);
router.get("/verif/:email", userController.emailVerification);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/sendForgotPassword", userController.sendMailforgotPassword);
router.post("/forgotpassword/:id", userController.forgotpassword);
router.post("/contact", userController.Contact);
router.post("/loginsocial", userController.authWithSocialMedia)
router.put ("/updatePassword/:id",userController.updatePassword)
router.put("/updateIdentite/:id",upload.array("image",1),userController.updateIdentite)
router.put("/addPoint/:id",userController.addPoint)
router.put ("/bloque/:id",userController.bloque)
router.get("/findAll",userController.findAlluser)
router.delete("/delete/:id",userController.delete)
module.exports = router;
