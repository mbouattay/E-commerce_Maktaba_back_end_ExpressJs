const express  = require ("express") ; 
const adressesController = require ("../Controllers/adresses.controller") ; 
const router = express.Router();
router.post("/add",adressesController.add)
router.put("/update/:id/:userId",adressesController.update)
router.delete("/delete/:id/:userId",adressesController.delete)
module.exports = router