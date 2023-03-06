const express = require("express") ;
const router = express.Router() ; 
const upload = require ("../middleware/upload")
const produitController = require("../Controllers/produit.controller")
router.post("/add", upload.single("image"),produitController.add);
router.put ("/update/:id",upload.single("image"),produitController.update)
router.delete("/delete/:id",produitController.delete) 
router.get("/findAll",produitController.findAll) 
router.get("/findByFournisseur",produitController.findAllProduitByfournisseur); 
module.exports = router ;