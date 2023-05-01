const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ;
const {ROLES,inRole} = require("../security/Rolemiddleware");
const clientController = require ("../Controllers/client.controller");
router.get("/findOne/:id",clientController.findOneClient)
module.exports = router