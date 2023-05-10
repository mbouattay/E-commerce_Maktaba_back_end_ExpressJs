const express = require("express") ; 
const router = express.Router()
const commandeDetailController = require ("../Controllers/commandeEnDetail.controller") ;
router.post("/add",commandeDetailController.add) ;
router.get("/findcommandebyuser/:id",commandeDetailController.findCommandeByuser)
router.get("/findOneCommande/:id",commandeDetailController.findOneCommande)
router.get("/findCommandeBylibrairie/:labrairieId",commandeDetailController.findCommandeBylibrairie)
module.exports = router ;  