const { where } = require("sequelize")
const Model = require("../Models/index")
const clientController = {
    modifieProfile : async (req, res)=>{
        try{
            const datauser = {
                address : req.body.address,
                ville : req.body.ville , 
                telephone: req.body.telephone,
                name : req.body.name,
                prenom : req.body.prenom
            }
            await Model.user.update(datauser,{where :{id:req.params.id}}).then((reponse)=>{
                if(reponse){
                    return res.status(200).json({
                        success : true
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
}
module.exports=clientController