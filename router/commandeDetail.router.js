const express = require("express") ; 
const router = express.Router()
const commandeDetailController = require ("../Controllers/commandeEnDetail.controller");
router.post("/add",commandeDetailController.add);
router.get("/findcommandebyuser/:id",commandeDetailController.findCommandeByuser)
router.get("/findOneCommande/:id",commandeDetailController.findOneCommande)
router.get("/findCommandeBylibrairie/:labrairieId",commandeDetailController.findCommandeBylibrairie)
router.put("/Accepter/:id",commandeDetailController.Accepter)
router.put("/Annuler/:id",commandeDetailController.Annuler)
router.put("/livre/:id",commandeDetailController.livre)
router.post("/addArticle",commandeDetailController.addArticle)
router.delete("/deleteArticle/:produitlabrairieId/:commandeEnDetailId",commandeDetailController.deleteArticle)
router.get("/nb_commande_par_jour/:id",commandeDetailController.nb_commande_par_jour)
router.get("/produit_plus_vendus/:id",commandeDetailController.produit_plus_vendus)
router.get("/nb_commande/:id",commandeDetailController.nb_commande)
module.exports = router;