const express = require("express")
const router = express.Router() 
const donsontroller = require ("../Controllers/dons.Controller")
router.post("/add", donsontroller.add)
router.get("/findDons",donsontroller.find)
router.get("/findOneDons/:id",donsontroller.findOne)
router.put("/updateDons/:id",donsontroller.update)
router.delete("/deleteDons/:id",donsontroller.delete)
module.exports= router 