const Model = require("../Models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../config/Noemailer.config");
const { response } = require("express");
const { where } = require("sequelize");
const refreshTokens = [];
const forgetpasswordToken = []
const userController = {
  login: async (req, res) => {
    try {
      Model.user.findOne({ where: { email: req.body.email }}).then((User) => {
        if (User === null) {
          return res.status(400).json({
            success: false,
            err:"email is not correct"}
            );
        } else {
          if (User.email_verifie === "verifie") {
            bcrypt.compare(req.body.password, User.password).then((isMatch) => {
              if (!isMatch) {
                return res.status(400).json({
                  success: false,
                  err:"password is not correct"});
              } else {
                var accessToken = jwt.sign(
                  {
                    id: User.id,
                    fullname:User.fullname,
                    role :User.role ,
                    avatar :User.avatar
                  },
                  process.env.PRIVATE_KEY,
                  { expiresIn: "1h" }
                );
                var refreshToken = jwt.sign(
                  {
                    id: User.id,
                    fullname:User.fullname,
                    role : User.role,
                    avatar :User.avatar
                  },
                  process.env.REFRESH_KEY,
                  { expiresIn: "30d" }
                );
                refreshTokens.push(refreshToken);
                res.status(200).json({
                  success: true,
                  message: "success",
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                });
              }
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "verifie your email",
            });
          }
        }
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  register: async (req, res) => {
    try {
      Model.user.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user !== null) {
          return res.status(400).json({ 
            success: false,
            err:"email exist"
          });
        } else {
          const passwordHash = bcrypt.hashSync(req.body.password, 10);
          const datauser = {
            fullname : req.body.fullname,
            email: req.body.email,
            password: passwordHash,
            email_verifie: "non_verifie",
            role : "client"
          };
          Model.user.create(datauser).then((user) => {
            if (user !== null) {
              const dataClient = {
                id : user.id, 
                userId : user.id
              }
              Model.client.create(dataClient).then((client)=>{
                if(client!==null){
                  let link = `${process.env.URL_BACK}/user/verif/${req.body.email}`;
                  sendMail.sendEmailVerification(req.body.email, link);
                  res.status(200).json({
                    success: true, 
                    message: "verif your email now ",
                  });
                }
              })
            } 
          });
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  emailVerification: async (req, res) => {
    try{
      Model.user
        .findOne({ where: { email: req.params.email } })
        .then(async (user) => {
          if (user !== null) {
            await Model.user
              .update(
                { email_verifie: "verifie" },
                {
                  where: {
                    email: req.params.email,
                  },
                }
              )
              .then((response) => {
                if (response != 0) {
                  res.redirect(`${process.env.URL_FRONT}/login`);
                } 
              });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  refresh: async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({
          success: false, 
          error: "Refresh token not found"});
      }
      jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, User) => {
        if (!err) {
          var accessToken = jwt.sign(
            {
              id: User.id,
              fullname: User.fullname,
            },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }
          );
          return res.json({ success: true, accessToken });
        } else {
          return res.json({
            success: false,
            message: "Invalid refresh token",
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  sendMailforgotPassword: async (req, res) => {
    try {
      Model.user
        .findOne({ where: { email: req.body.email } })
        .then((olduser) => {
          if (olduser === null) {
            return res.status(400).json({
              success: false,
              message: " user not exist",
            });
          } else {
            const secret = process.env.forget_key + olduser.password;
            const token = jwt.sign(
              { email: olduser.email, id: olduser.id },
              secret,
              {
                expiresIn: "5m",
              }
            );
            forgetpasswordToken.push(token)
            const link = `${process.env.URL_FRONT}/reset-password/${olduser.id}/${token}`;
            sendMail.sendEmailToForgetPassword(req.body.email, link);
            res.status(200).json({
              success: true,
              message: "check your inbox now",
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  forgotpassword: async (req, res) => {
    try {
      const id= req.params.id;
      const {password,token } = req.body;
      if (!token ||!forgetpasswordToken.includes(token)) {
        return res.status(400).json({
          success: false, 
          error: " token not found"});
      }
      Model.user.findOne({ where: { id: id } }).then((olduser) => {
        if (olduser !== null) {
          const secret = process.env.forget_key + olduser.password;
          jwt.verify(token, secret, async (err, User) => {
            if (!err) {
              const newPassword = bcrypt.hashSync(password, 10);
              await Model.user
                .update(
                  { password: newPassword },
                  {
                    where: {
                      id: id,
                    },
                  }
                )
                .then((response) => {
                  if (response !== 0) {
                    return res.status(200).json({
                      success: true,
                      message: " forgot password Done",
                    });
                  }
                });
            } else {
              return res.status(400).json({
                success: false,
                message: "Invalid refresh token",
              });
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            message: " user not exist",
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  Contact: async (req, res) => {
    try {
      const { email, sujet, message, name } = req.body;
      sendMail.sendContactEmail(email, sujet, message, name)
      res.status(200).json({
        success: true,
        message: " message envoyer ",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  authWithSocialMedia: async (req, res) => {
    try {
        const { email, fullname} = req.body;
        Model.user.findOne({ where: { email: email }}).then((user) => {
          if (user !== null) {
            var accessToken = jwt.sign(
              {
                id: user.id,
                fullname: user.fullname,
                role: user.role,
                avatar :user.avatar
              },
              process.env.PRIVATE_KEY,
              { expiresIn: "1h" }
            );
            var refreshToken = jwt.sign(
              {
                id: user.id,
                fullname:user.fullname,
                role: user.role,
                avatar :user.avatar
              },
              process.env.REFRESH_KEY,
              { expiresIn: "30d" }
            );
            refreshTokens.push(refreshToken);
            return res.status(200).json({
              success: true,
              message: "success login",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          } else {
            const characters =
              "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let Password = "";
            for (let i = 0; i < 25; i++) {
              Password +=
                characters[Math.floor(Math.random() * characters.length)];
            }
            const passwordHash = bcrypt.hashSync(Password, 10);
            const datauser = {
              fullname : fullname,
              email: email,
              password: passwordHash,
              email_verifie: "verifie",
              role: "client",
            };
            Model.user.create(datauser).then((user) => {
              if (user !== null) {
                const dataClient = {
                  id: user.id,
                  userId : user.id
                }
                Model.client.create(dataClient).then((client)=>{
                  if(client!==null){
                    var accessToken = jwt.sign(
                      {
                        id: user.id,
                        fullname:fullname,
                        role: user.role,
                      
                      },
                      process.env.PRIVATE_KEY,
                      { expiresIn: "1h" }
                    );
                    var refreshToken = jwt.sign(
                      {
                        id: user.id,
                        fullname:fullname,
                        role: user.role,
                      },
                      process.env.REFRESH_KEY,
                      { expiresIn: "30d" }
                    );
                    refreshTokens.push(refreshToken);
                    return res.status(200).json({
                        success: true,
                        message: "success create and login ",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                      });
                    }
                })
                
              }
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  updatePassword : async (req,res) =>{
      try{
        const {newPassword,ActuelPassword} = req.body ; 
        Model.user.findOne({where : {id:req.params.id},attributes:["password"] }).then((response) => {
          bcrypt.compare(ActuelPassword, response.password).then((isMatch) => {
            if(!isMatch){
              return  res.status(200).json({
                success : false , 
                message : " ActuelPassword not equal to password"
              })
            }else{
              const passwordHash = bcrypt.hashSync(newPassword, 10);
              Model.user.update({password : passwordHash},{where :{id : req.params.id}}).then((response) => {
                if(response!=0){
                  return res.status(200).json({
                    success : true , 
                    message :" update Password done !! "
                  })
                }else{
                  return res.status(400).json({
                    success : false , 
                    message : " err to update password " , 
                  })
                }
            })
            }
          })
        })
      }catch(err){
          return res.status(400).json({
            success : false , 
            err : err
          })
      }
  },
  updateIdentite: async (req, res) => {
    try {
      if(req.files.length!==0){
        req.body["image"] = req.files[0].filename;
      }else{
        req.body["image"]==null
      }
      
      const { Date_de_naissance,image,telephone,fullname,email } = req.body;
      const data = {
        Date_de_naissance: Date_de_naissance,
        avatar:image,
        telephone: telephone,
        fullname: fullname,
        email: email,
      };
      Model.user
        .update(data, { where: { id: req.params.id } })
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "update indentite Done !!! ",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "error update identite",
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  addPoint : async (req,res)=>{
    try{
     Model.user.findByPk(req.params.id)
      .then((user) => {
        if (user) {
          const updatedPoint = user.point + (req.body.point);
          Model.user.update({ point: updatedPoint },{ where: { id:req.params.id } }).then((response)=>{
            if(response!==0){
              return res.status(200).json({
                success: true,
                message: "update point done !!",
              });
            }else{
              return res.status(400).json({
                success: false,
                message: " error de update point",
              });
            }
          })
        }
        
      });
    }catch(err){
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
  
  
};
module.exports = userController;

