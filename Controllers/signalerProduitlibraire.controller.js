const Model = require ("../Models/index")
const signalerProduitlibraireController = {
    add : async (req, res)=>{
        try{
            req.body[image] = req.file.filename
            const {fullnameUser,email,message,image,produitlabrairieId} = req.body
            const data = {
                fullnameUser : fullnameUser , 
                email : email , 
                message : message , 
                image : image , 
                produitlabrairieId : produitlabrairieId
            }
            Model.signalerProduitlibraire.create(data).then((response) => {
                if(response !== null){
                    return res.status(200).json({
                        success : true , 
                        message : " signalerProduitlibraire created !!! "
                    })
                }
            }).catch((err) => {
                return res.status(200).json({
                    success : false , 
                    message : "  err creation signale " , 
                    err : err
                })
            });
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err,
            });
        }
    }
}
module.exports = signalerProduitlibraireController