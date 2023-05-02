const express = require ("express") ;
const avisProduitlibraireController =  require ("../Controllers/avisProduitlibraire.controller") 
const router = express.Router();
router.post("/add", avisProduitlibraireController.add)
router.put("/update/:id/:clientId",avisProduitlibraireController.update)
router.delete("/delete/:id/:clientId",avisProduitlibraireController.delete)
router.get("/findAllbyclient/:clientId",avisProduitlibraireController.getAllAvisByClient)
router.get("/getAllAvisByproduit/:produitlabrairieId",avisProduitlibraireController.getAllAvisByproduit)
module.exports = router;