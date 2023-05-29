const express  = require ("express") ; 
const BecomePartnerController = require ("../Controllers/becomePartner.Controller") ; 
const router = express.Router();
const upload = require ("../middleware/upload")
router.post("/add", upload.array("file",1),BecomePartnerController.add)
router.get("/findAll",BecomePartnerController.findAll)
module.exports = router