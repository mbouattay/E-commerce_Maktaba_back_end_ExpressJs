const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ; 
const {ROLES,inRole} = require("../security/Rolemiddleware");
const clientController = require ("../Controllers/client.controller");
router.post("/add",clientController.addClient);
module.exports = router