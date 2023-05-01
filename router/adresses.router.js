const express  = require ("express") ; 
const adressesController = require ("../Controllers/adresses.controller") ; 
const router = express.Router();
router.post("/add",adressesController.add)
router.put("/update/:id/:clientId",adressesController.update)
router.delete("/delete/:id/:clientId",adressesController.delete)
module.exports = router