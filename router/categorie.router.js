const express = require("express")
const router = express.Router() 
const categorieController = require ("../Controllers/categorie.controller")
router.post("/add", categorieController.add)
router.get("/findCategorie",categorieController.find)
router.put("/updateCategorie/:id",categorieController.update)
router.delete("/deleteCategorie/:id",categorieController.delete)
module.exports= router 