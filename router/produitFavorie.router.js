const express = require("express");
const router = express.Router() ;
const produitFavorieController = require("../Controllers/produitFavorie.controller")
router.post("/add",produitFavorieController.add)
router.delete("/delete/:id/:clientId",produitFavorieController.delete)
router.get("/findAllbyclient/:clientId",produitFavorieController.findAllByclient)
module.exports=router