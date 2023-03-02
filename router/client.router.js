const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ; 
const {ROLES,inRole} = require("../security/Rolemiddleware");
const clientController = require ("../Controllers/client.controller");
router.put("/update/:id",passport.authenticate("jwt", { session: false }),inRole(ROLES.CLIENT),clientController.modifieProfile);
router.delete("/delete/:id", clientController.delete);
module.exports = router