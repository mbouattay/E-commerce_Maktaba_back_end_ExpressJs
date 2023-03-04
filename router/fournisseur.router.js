const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ; 
const {ROLES,inRole} = require("../security/Rolemiddleware");
const fournisseurController = require ("../Controllers/fournisseur.controller");
router.post("/add",fournisseurController.addfournisseur);
module.exports = router