const { response } = require("express")
const Model = require("../Models/index")
const codeClientController = {
        add : async (req, res)=>{
            try{
                const {codePromoId,clientId}= req.body
                const data={
                    codePromoId:codePromoId , 
                    clientId : clientId
                }
                Model.codeClient.create(data).then((response)=>{
                    if(response!==null){
                        return res.status(200).json({
                            success: true,
                            message: " codeClient created",
                          });
                    }else{
                        return res.status(200).json({
                            success: false,
                            message: "err lorsque de creation",
                          });
                    }
                })
            }catch(err){
                return res.status(400).json({
                    success: false,
                    error: err,
                  });
            }
        } , 
        delete: async (req, res) => {
            try{
                Model.codeClient.destroy({
                    where: {
                      id: req.params.id
                    }
                  }).then((reponse)=>{
                    if(reponse!==0){
                        res.status(200).json({
                            success:true,
                            message : " codeClient delete"
                        }) 
                    }else{
                        return res.status(200).json({
                            success: false,
                            message: "err lorsque de suppression de codeClient",
                          });
                    }
                  })
            }catch(err){
                return res.status(400).json({
                    success: false,
                    error: err,
                });
            }
          },
          findcode : async (req,res)=>{
                try{
                    Model.codePromo.findAll( {include: [{model:Model.client ,attributes: ['id'] ,include :[{model : Model.user ,attributes: ['fullname'] }]},{model:Model.labrairie,attributes:["id"],include:[{model:Model.user,attributes:["fullname"]}]},{model:Model.partenaire,attributes:["id"],include:[{model:Model.user,attributes:["fullname"]}]}]}).then((response)=>{
                        if(response!==null){
                            res.status(200).json({
                                success:true,
                                code : response 
                            }) 
                        }
                    })
                }catch(err){
                    return res.status(404).json({
                        success : false,
                        error : err
                    })
                }
          }
}
module.exports = codeClientController