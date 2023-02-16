const express = require("express")
const router = express.Router() 
const produitController = require ("../Controllers/produit.controller")
router.post("/add", produitController.add)
router.get("/findProduit",produitController.find)
router.get("/findOneProduit/:id",produitController.findOne)
router.put("/updateProduit/:id",produitController.update)
router.delete("/deleteProduit/:id",produitController.delete)
module.exports= router 