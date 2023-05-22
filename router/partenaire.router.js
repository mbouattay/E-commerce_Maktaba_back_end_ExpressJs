const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ; 
const {ROLES,inRole} = require("../security/Rolemiddleware");
const partenaireController = require ("../Controllers/partenaire.controller");
router.post("/add",partenaireController.addpartenaire);
router.get("/findAll",partenaireController.findPartnaire)
module.exports = router