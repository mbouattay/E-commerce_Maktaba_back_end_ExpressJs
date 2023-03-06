const express = require("express") ; 
const router = express.Router()
const upload = require ("../middleware/upload")
const ProduitLabrairieController  = require("../Controllers/produitLabrairie.controller")
router.post("/add", upload.single("image"),ProduitLabrairieController.add);
router.put ("/update/:id",upload.single("image"),ProduitLabrairieController.update)
router.delete("/delete/:id",ProduitLabrairieController.delete) 
router.get("/findAll",ProduitLabrairieController.findAll) 
router.get("/findByFournisseur",ProduitLabrairieController.findAllProduitByLabrairie); 
module.exports=router