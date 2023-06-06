const express = require("express")
const router = express.Router() 
const SousCategorieController = require ("../Controllers/sousCategorieController")
router.post("/add", SousCategorieController.add)
router.get("/findAll",SousCategorieController.find)
router.put("/updateSousCategorie/:id",SousCategorieController.update)
router.delete("/deleteSousCategorie/:id",SousCategorieController.delete)
router.get("/findBycategorie/:id",SousCategorieController.findByCategorie)
module.exports= router 