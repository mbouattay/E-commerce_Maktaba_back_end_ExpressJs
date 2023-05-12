const express = require("express") ; 
const router = express.Router()
const upload = require ("../middleware/upload")
const ProduitLabrairieController  = require("../Controllers/produitLabrairie.controller")
router.post("/add", upload.array("image",3),ProduitLabrairieController.add_produit_with_import_image);
router.put ("/update/:id",upload.array("image",3),ProduitLabrairieController.update)
router.delete("/delete/:id",ProduitLabrairieController.delete) 
router.get("/findAll",ProduitLabrairieController.findAll) 
router.get("/findBylabrairie/:id",ProduitLabrairieController.findAllProduitByLabrairie); 
router.get("/findOneProduit/:id",ProduitLabrairieController.findOneProduit);
router.get("/findProduitsBycategorie/:categorieId",ProduitLabrairieController.findProduitsBycategorie);
router.get("/findlistDeProduitBylibrairie/:id",ProduitLabrairieController.Liste_de_produits_librairie);
module.exports=router