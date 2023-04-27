const { where } = require("sequelize");
const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const { response } = require("express");
const clientController = {
    addClient : async (req, res)=>{
        try{
            const {email, name} = req.body;
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
                  password: passwordHash,
                  fullname:name,
                  email_verifie: "verifie",
                  role: "client",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const dataClient = {
                      id : user.id,
                      userId : user.id
                    }
                    Model.client.create(dataClient).then((client)=>{
                      if(client!==null){
                        return res.status(200).json({
                            success: true,
                            message: "success create client",
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
    findOneClient : async (req,res)=>{
        try{
            Model.client.findOne({where : {userId : req.params.id},include:[{model : Model.user ,attributes:["fullname","email"], include:[{model:Model.adresses}]}]})
            .then((response) => {
                if(response !== null ){
                    return  res.status(200).json({
                        success : true , 
                        client : response 
                    })
                }else{
                  return  res.status(200).json({
                    success : false , 
                    message : "client introuvable" 
                })
                }
            }).catch((err) => {
                  return res.status(400).json({
                    success : false , 
                    err : err
                  })
            });
        }catch(err){
          return res.status(400).json({
            success : false , 
            err : err
          })
        }
    },
    updateIdentite : async (req,res) =>{
      try{
          const{Date_de_naissance,telephone,fullname,email}= req.body
          Model.user.update({fullname:fullname,email:email},{where :{ id:req.params.id}}).then((response)=>{
              if(response!==0){
                Model.client.update({Date_de_naissance :Date_de_naissance , telephone:telephone},{where:{userId :req.params.id}})
                .then((response)=>{
                  if(response!==0){
                      return res.status(200).json({
                          success :true , 
                          message : " update identite Done !! "
                      })
                  }else{
                      return res.status(200).json({
                        success : false , 
                        message : "err update identite"
                      })
                  }
                })
              }else{
                return res.status(200).json({
                  success : false , 
                  message : "err update identite"
                })
              }
          })
      }catch(err){
          return res.status(400).json({
            success : false , 
            error : err
          })
      }
    }
}
module.exports=clientController