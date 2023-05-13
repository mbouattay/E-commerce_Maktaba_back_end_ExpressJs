const express = require ("express") ;
const avisProduitlibraireController =  require ("../Controllers/avisProduitlibraire.controller") 
const router = express.Router();
router.post("/add", avisProduitlibraireController.add)
router.put("/update/:id",avisProduitlibraireController.update)
router.delete("/delete/:id",avisProduitlibraireController.delete)
router.get("/findAllbyclient/:clientId",avisProduitlibraireController.getAllAvisByClient)
router.get("/getAllAvisByproduit/:produitlabrairieId",avisProduitlibraireController.getAllAvisByproduit)
router.get("/avislib/:id",avisProduitlibraireController.getAllavisBylibriarie)
module.exports = router;