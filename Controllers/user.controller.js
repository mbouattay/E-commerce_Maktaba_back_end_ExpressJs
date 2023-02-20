const { where } = require("sequelize");
const Model = require ("../Models/index") ; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const sendMail = require ('../config/Noemailer.config')
let refreshTokens = [];
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
                                var accessToken  = jwt.sign({
                                    id: User.id,
                                    name_prenom : User.name_prenom , 
                                    role : User.role
                                }, process.env.PRIVATE_KEY, { expiresIn: '1h' }) ; 
                                var refreshToken = jwt.sign({
                                    id: User.id,
                                    name_prenom : User.name_prenom ,
                                    role : User.role
                                }, process.env.REFRESH_KEY, { expiresIn: '30d' }) ;
                                refreshTokens.push(refreshToken); 
                                res.status(200).json({
                                    message: "success",
                                    accessToken :accessToken,
                                    refreshToken :refreshToken
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
                    name_prenom  : req.body.name_prenom , 
                    email_verifie : "non_verifie",
                    role : "client"
                    }
                    Model.user.create(datauser);
                    let link =`http://localhost:3000/user/verif/${req.body.email}`; 
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
                await Model.user.update({ email_verifie: "verifie" },{ 
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
    },
    refresh : async (req,res)=>{
        try{
            const refreshToken = req.body.refreshToken;
            if (!refreshToken || !refreshTokens.includes(refreshToken)) {
                return res.json({ message: "Refresh token not found" });
            }
            jwt.verify(refreshToken,process.env.REFRESH_KEY, (err, User) => {
                if (!err) {
                    var accessToken  = jwt.sign({
                        id: User.id,
                        name_prenom : User.name_prenom ,
                        role : User.role
                    }, process.env.PRIVATE_KEY, { expiresIn: '1h' }) ; 
                    return res.json({ success: true, accessToken });
                } else {
                    return res.json({
                        success: false,
                        message: "Invalid refresh token"
                    });
                }
            });
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
    },
    sendMailforgotPassword : async (req,res)=>{
        try{
            Model.user.findOne({where:{email:req.body.email}}).then((olduser)=>{
                if(olduser===null){
                    return res.status(400).json({
                        success : false ,
                        message : " user not exist"
                    })
                }else{
                    const secret = process.env.forget_key + olduser.password;
                    const token = jwt.sign({ email: olduser.email, id: olduser.id }, secret, {
                        expiresIn: "5m",
                    });
                    const link = `http://localhost:3001/reset-password/${olduser.id}/${token}`;
                    sendMail.sendEmailToForgetPassword(req.body.email,link)
                    res.status(200).json({
                        success:true,
                        message :"check your inbox now"
                    })
                }
            })
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
    },
    forgotpassword : async (req,res)=>{
        try{
            const { id, token } = req.params;
            const { password } = req.body;
            Model.user.findOne({where:{id:id}}).then((olduser)=>{
                if(olduser!==null){
                    const secret = process.env.forget_key + olduser.password;
                    jwt.verify(token,secret,async(err, User) => {
                        if(!err){
                            const newPassword = bcrypt.hashSync(password, 10);
                           await Model.user.update({ password:newPassword },{ 
                                where: {
                                  id: id
                                }
                            })
                            return res.status(200).json({
                                success: true,
                                message: " forgot password Done"
                            });
                        }else{
                            return res.status(400).json({
                                success: false,
                                message: "Invalid refresh token"
                            }); 
                        }
                    })

                } else{
                    return res.status(400).json({
                        success: false,
                        message: " user not exist"
                    });
                }
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