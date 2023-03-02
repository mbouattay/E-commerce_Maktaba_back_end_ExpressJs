const Model = require("../Models/index")
const clientController = {
    modifieProfile : async (req, res)=>{
        try{
            const datauser = {
                address : req.body.address,
                ville : req.body.ville , 
                telephone: req.body.telephone,
                fullname : req.body.fullname
            }
            await Model.user.update(datauser,{where :{id:req.params.id}}).then((reponse)=>{
                if(reponse){
                    return res.status(200).json({
                        success : true , 
                        message : "update done"
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
    findOne: async (req,res)=>{
        try{
             Model.client.findOne({where:{id:req.params.id}})
            .then((produit)=>{
                if(produit!==null){
                    res.status(200).json({
                        success:true,
                        produit: produit
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
    delete : async (req,res)=>{
        try{
             Model.user.destroy({
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                if(reponse!==0){
                    res.status(200).json({
                        success:true,
                        message : "client delete"
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
module.exports=clientController