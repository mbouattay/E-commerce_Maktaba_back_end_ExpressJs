const Model = require("../Models/index")
const avisProduitlibraireController = {
    add : async (req,res)=>{
        try{
            const {nbStart,commenter,clientId,produitlabrairieId} = req.body 
            const data = {
                nbStart : nbStart , 
                commenter : commenter , 
                clientId : clientId, 
                produitlabrairieId : produitlabrairieId
            }
            Model.avisProduitlibraire.create(data).then((response) => {
                if(response!==null){
                    return res.status(200).json({
                        success : true , 
                        message : "avis created"
                       }) 
                }else{
                    return res.status(200).json({
                        success : true , 
                        message : "err create avis"
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

    
}
module.exports = avisProduitlibraireController