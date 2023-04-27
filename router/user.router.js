const userController = require("../Controllers/user.controller");
const express = require("express");
const router = express.Router();
router.post("/register", userController.register);
router.get("/verif/:email", userController.emailVerification);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/sendForgotPassword", userController.sendMailforgotPassword);
router.post("/forgotpassword/:id", userController.forgotpassword);
router.post("/contact", userController.Contact);
router.post("/loginsocial", userController.authWithSocialMedia)
router.put ("/updatePassword/:id",userController.updatePassword)
module.exports = router;
