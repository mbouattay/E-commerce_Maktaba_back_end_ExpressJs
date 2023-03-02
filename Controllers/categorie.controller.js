const Model = require("../Models/index")
const categorieController = {
    add : async (req,res)=>{
        try{
            const data = {
                name : req.body.name
            }
            await Model.categorie.create(data).then((reponse)=>{
                if(reponse!==null){
                    res.status(200).json({
                        success:true,
                        categorie: reponse,
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
    update : async(req,res)=>{
        try{
            const data = {
                name : req.body.name 
            }
            await Model.categorie.update(data,{ 
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                    if(reponse){
                        res.status(200).json({
                            success:true,
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
    delete : async (req,res)=>{
        try{
            await Model.categorie.destroy({
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                if(reponse !==0){
                    res.status(200).json({
                        success:true,
                        message : "delete done"
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
    find : async (req,res)=>{
        try{
            await Model.categorie.findAll().then((categorie)=>{
              
                    res.status(200).json({
                        success:true,
                        categorie: categorie
                    }) 
                
            })
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
    }
}
module.exports=categorieController ;