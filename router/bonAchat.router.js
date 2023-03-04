const bonAchatController = require("../Controllers/bonAchat.controller")
const express = require("express");
const router = express.Router() ;
router.post("/add",bonAchatController.add) 
router.put ("update/:id",bonAchatController.update)
router.get("/findAll",bonAchatController.findAll)
router.get("/findOne/:id",bonAchatController.findOne)
router.get("/findByuser/:id",bonAchatController.findByuser)
router.get("/findBypartenaire/:id",bonAchatController.findBypartenaire)
router.delete("/delete/:id",bonAchatController.delete)
module.exports = router; 