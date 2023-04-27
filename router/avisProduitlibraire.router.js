const express = require ("express") ;
const avisProduitlibraireController =  require ("../Controllers/avisProduitlibraire.controller") 
const router = express.Router();
router.post("/add", avisProduitlibraireController.add)
module.exports = router;