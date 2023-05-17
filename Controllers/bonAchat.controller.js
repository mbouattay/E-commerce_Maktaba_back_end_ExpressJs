const Model = require ("../Models/index")
const bonAchatController = {
    add : async (req , res)=>{
        try{
            const {solde,etat,code,userId,partenaireId} = req.body
            const data = {
                solde : solde , 
                etat : etat , 
                code:code ,
                userId : userId , 
                partenaireId : partenaireId 
            }
            Model.bonAchat.create(data).then((response)=>{
                if(response!==null){
                    return res.status(200).json({
                        success: true,
                        message: " bon d'Achat created",
                        bonAchat: response
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
    update: async (req, res) => {
        try{
            Model.bonAchat
                  .update(
                    { etat: req.body.etat },
                    {
                      where: {
                        id: req.params.id,
                      },
                    }
                  ).then((response)=>{
                    if (response!==0){
                        return res.status(200).json({
                            success: true,
                            message : " update done ! "
                          });
                    }else{
                        return res.status(400).json({
                            success: false,
                            error: "error update ",
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
    delete : async (req , res)=>{
        try{
            Model.bonAchat.destroy({
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                if(reponse!==0){
                    res.status(200).json({
                        success:true,
                        message : " bon d'achat delete"
                    }) 
                }
              })
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    },
    findAll : async (req , res)=>{
        try{
            Model.bonAchat.findAll().then((response)=>{
                if(response!==null){
                    
                  res.status(200).json({
                    success:true,
                    bonAchat : response
                }) 
                }
              })
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    },
    findOne : async (req , res)=>{
        try{
            Model.bonAchat.findOne({ where: { id: req.params.id }}).then((response)=>{
                if(response !==null){
                  res.status(200).json({
                    success:true,
                    bonAchat : response
                }) 
                }
              })
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    },
    findByuser : async (req , res)=>{
        try{
            Model.bonAchat.findAll({
                where: {
                  userId: req.params.id
                }}).then((response)=>{
                if(response!==null){
                  res.status(200).json({
                    success:true,
                    bonAchat : response
                }) 
                }
              })
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    },
    findBypartenaire : async (req , res)=>{
        try{
            Model.bonAchat.findAll({
                where: {
                    partenaireId: req.params.id
                    
                },include : [{model : Model.user , include:[Model.client,Model.fournisseur,Model.labrairie]}]}).then((response)=>{
                if(response!==null){
                  res.status(200).json({
                    success:true,
                    bonAchat : response
                }) 
                }
              })
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    } 
}
module.exports = bonAchatController