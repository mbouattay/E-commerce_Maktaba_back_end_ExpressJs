const express = require("express") ; 
const router = express.Router()
const upload = require ("../middleware/upload")
const CatalogeController  = require("../Controllers/catalogeController")
router.post("/add", upload.array("image",3),CatalogeController.add);
router.get("/findAll",CatalogeController.findAll)
router.get("/findOne/:id",CatalogeController.findOne)
router.delete("/delete/:id",CatalogeController.delete)
router.put("/changeVisibilite/:id",CatalogeController.changeVisibilite)
router.put("/update/:id",CatalogeController.update)
module.exports=router