const express = require("express") ; 
const passport = require("passport");
const router = express.Router() ; 
const {ROLES,inRole} = require("../security/Rolemiddleware");
const labriarieController = require ("../Controllers/labriarie.controller");
router.post("/add",labriarieController.addlabrairie);
module.exports = router