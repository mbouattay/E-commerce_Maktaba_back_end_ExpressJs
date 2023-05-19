const Model = require ("../Models/index")
const signalerProduitlibraireController = {
    add : async (req, res)=>{
        try{
            if(req.files.length===0){

                return res.status(400).json({
                    success : false , 
                    message : "  0 file  " , 
                })
            }
            req.body["image"] = req.files[0].filename;
            const {fullnameUser,email,message,image,produitlabrairieId} = req.body
            const data = {
                fullnameUser : fullnameUser , 
                email : email , 
                message : message , 
                image : image , 
                produitlabrairieId : produitlabrairieId
            }
            console.log(data)
            Model.signalerProduitlibraire.create(data).then((response) => {
                if(response !== null){
                    return res.status(200).json({
                        success : true , 
                        message : " signalerProduitlibraire Done !!! "
                    })
                }else{
                    return res.status(400).json({
                        success : false , 
                        message : "  err to add  signale " , 
                  
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
module.exports = signalerProduitlibraireController