const codePromoController = require("../Controllers/codePromo.controller")
const express = require ("express")
const router =  express.Router() 
router.post("/add", codePromoController.add) 
router.delete("/delete/:id" , codePromoController.delete)
router.get("/findAll",codePromoController.findAll) 
router.get("/findOne/:code", codePromoController.findOne)
router.put("/update/:id" , codePromoController.update)
module.exports = router