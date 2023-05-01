const express = require ("express")
const signalerProduitlibraireController = require("../Controllers/signalerProduitlibraire.controller")
const router = express.Router() ; 
const upload = require ("../middleware/upload")
router.post("/add", upload.array("image",1),signalerProduitlibraireController.add)
module.exports = router