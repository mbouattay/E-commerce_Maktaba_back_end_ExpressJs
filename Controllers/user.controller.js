const { where } = require("sequelize");
const Model = require ("../Models/index") ; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendMail = require ('../config/Noemailer.config')
const userController ={
        login : async (req,res)=>{
            try{
                Model.user.findOne({where:{email:req.body.email}})
                .then((User)=>{
                    if(User===null){
                        return res.status(404).json("email is not correct")
                    }else{
                        if(User.email_verifie==="verifie"){
                            bcrypt.compare(req.body.password,User.password)
                            .then((isMatch)=>{
                            if(!isMatch){
                                return res.status(404).json("password is not correct")
                            }else{
                                var token = jwt.sign({
                                    id: User.id,
                                    name : User.name , 
                                    prnom : User.prenom,
                                    role : User.role
                                }, process.env.PRIVATE_KEY, { expiresIn: '1h' }) ; 
                                res.status(200).json({
                                    message: "success",
                                    token:token
                                })
                            }
                        })
                    
                        }else{
                            return res.status(400).json({
                                success:false,
                                message:"verifie your email"
                            })
                        }
                    }
                        
                })    

            }catch(err){
                return res.status(400).json({
                    success:false,
                    error: err
                })
            }
    },
    register : async (req,res)=>{
        try{
            Model.user.findOne({where:{email:req.body.email}})
            .then((user)=>{
                if(user!==null){
                    return res.status(404).json("email exist")
                }else{
                   const passwordHash = bcrypt.hashSync(req.body.password, 10);
                   const datauser = {
                    email : req.body.email , 
                    password : passwordHash , 
                    telephone : req.body.telephone,
                    name : req.body.name , 
                    prenom : req.body.prenom,
                    email_verifie : "non_verifie",
                    role : "client"
                    }
                    Model.user.create(datauser);
                    let link =`localhost:3000/user/verif/${req.body.email}`; 
                    sendMail.sendEmailVerification(req.body.email,link); 
                    res.status(200).json({
                        success:true,
                        user: datauser,
                        message :"verif your email now "
                    }) 
                    
                }
            })
        }catch(err){
            res.status(400).json({
                success:false,
                error: err
            })
        }
    }
    ,
    emailVerification : async (req,res)=>{
        try{
            Model.user.findOne({where:{email:req.params.email}})
            .then(async(user)=>{
                await Model.user.update({ email_verifie: "verifie" }, {
                    where: {
                      email: req.params.email
                    }
                  });
                    res.redirect("http://localhost:3001/login")
               })
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
    }
}
module.exports = userController ; 