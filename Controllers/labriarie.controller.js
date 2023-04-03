const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const sendMail = require("../config/Noemailer.config");
const { response } = require("express");
const LabriarieController = {
    addlabrairie : async (req, res)=>{
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
                  role: "labrairie",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const dataLabriarie = {
                      id : user.id,
                      userId : user.id
                    }
                    Model.labrairie.create(dataLabriarie).then((labrairie)=>{
                      sendMail.acceptationDemendePartenariat(email,Password)
                      if(labrairie!==null){
                        return res.status(200).json({
                            success: true,
                            message: "success create labrairie",
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
    findProfile : async (req,res)=>{
      try{
          Model.user.findOne({
            where: { id: req.params.id },attributes:["fullname","avatar","email"],include:[{model : Model.labrairie,attributes:["id","address","telephone","ville"],include:[{model: Model.produitlabrairie}]}]
          }).then((response)=>{
            if(response!== null){
              res.status(200).json({
                success : true ,
                profile : response
              })
            }else{
              res.status(200).json({
                success : false , 
                message :"profile not find"
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
module.exports=LabriarieController