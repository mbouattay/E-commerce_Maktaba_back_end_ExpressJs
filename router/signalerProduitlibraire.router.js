const express = require ("express")
const signalerProduitlibraireController = require("../Controllers/signalerProduitlibraire.controller")
const router = express.Router() ; 
router.post("/add",signalerProduitlibraireController.add)
module.exports = router