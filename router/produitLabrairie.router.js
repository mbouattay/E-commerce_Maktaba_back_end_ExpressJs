const express = require("express") ; 
const router = express.Router()
const upload = require ("../middleware/upload")
const ProduitLabrairieController  = require("../Controllers/produitLabrairie.controller")
router.post("/add", upload.array("image",3),ProduitLabrairieController.add_produit_with_import_image);
router.post("/addProdCataloge",ProduitLabrairieController.add);
router.put ("/update/:id",upload.array("image",3),ProduitLabrairieController.update)
router.delete("/delete",ProduitLabrairieController.delete) 
router.get("/findAll",ProduitLabrairieController.findAll) 
router.get("/findBylabrairie/:id",ProduitLabrairieController.findAllProduitByLabrairie); 
router.get("/findOneProduit/:id",ProduitLabrairieController.findOneProduit);
router.get("/findProduitsBycategorie/:categorieId",ProduitLabrairieController.findProduitsBycategorie);
router.get("/ListeDeProduitslibrairie/:id",ProduitLabrairieController.Liste_de_produits_librairie);
router.get("/produit_mieux_notes/:id",ProduitLabrairieController.produit_mieux_notes);
module.exports=router