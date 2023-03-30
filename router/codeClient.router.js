const express = require("express") ; 
const router = express.Router()
const codeClientController = require("../Controllers/codeClient.controller")
router.post("/add",codeClientController.add)
router.delete("/delete",codeClientController.delete)
router.get("/findCode",codeClientController.findcode)
module.exports = router 