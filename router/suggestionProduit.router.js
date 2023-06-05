const express = require("express")
const router = express.Router() 
const upload = require ("../middleware/upload")
const suggestionProduitController = require("../Controllers/suggestionProduit.Controller")
router.post("/add", upload.array("image",3),suggestionProduitController.add);
router.get("/findAll",suggestionProduitController.find)
module.exports= router 