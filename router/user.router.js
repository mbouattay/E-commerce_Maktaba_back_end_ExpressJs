const userController = require("../Controllers/user.controller")
const express = require ("express")
const passport = require("passport");
const jwt = require('jsonwebtoken')
const router = express.Router() ;
router.post("/register",userController.register)
router.get("/verif/:email",userController.emailVerification)
router.post("/login",userController.login)
router.get('/auth/google',passport.authenticate('google',{scope:[ 'email', 'profile' ]}))
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3001/login' }),
  function(req, res) {
    var token = jwt.sign({
      id: req.user.dataValues.id,
      name : req.user.dataValues.name , 
      prnom :  req.user.dataValues.name,
      role : req.user.dataValues.role
  }, process.env.PRIVATE_KEY, { expiresIn: '1h' }) ;
  res.redirect(
    `http://localhost:3001/?token=${token}`
  ); 
  });
module.exports = router ;  
