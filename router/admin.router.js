const express  = require ("express") ; 
const adminController = require ("../Controllers/adminController") ; 
const router = express.Router();
router.post("/add",adminController.add)
module.exports = router