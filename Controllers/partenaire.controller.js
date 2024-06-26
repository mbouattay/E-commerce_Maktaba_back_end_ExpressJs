const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const sendMail = require("../config/Noemailer.config");
const { response } = require("express");
const partenaireController = {
    addpartenaire : async (req, res)=>{
        try{
            const { email, fullname} = req.body;
                const characters =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let Password = "";
                for (let i = 0; i < 25; i++) {
                  Password +=
                    characters[Math.floor(Math.random() * characters.length)];
                }
                const passwordHash = bcrypt.hashSync(Password, 10);
                const datauser = {
                  email: email,
                  fullname:fullname,
                  password: passwordHash,
                  email_verifie: "verifie",
                  role: "partenaire",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const datapartenaire = {
                      id : user.id,
                      userId : user.id
                    }
                    Model.partenaire.create(datapartenaire).then((partenaire)=>{
                      if(partenaire!==null){
                        sendMail.acceptationDemendePartenariat(email,Password)
                        return res.status(200).json({
                            success: true,
                            message: "success create partenaire",
                          });
                        }
                    })
                  }
                });  
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
        
    },
    findPartnaire : async (req, res)=>{
      try{
          Model.partenaire.findAll({attributes: ["id"],include : [{model:Model.user , attributes:["fullname"]}]}).then((response)=>{
              if(response!==null){
                return res.status(200).json({
                  success:true , 
                  partainer : response
                })
              }else{
                res.status(400).json({
                  success : false , 
                  message : "zero partainer"
                })
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
module.exports=partenaireController