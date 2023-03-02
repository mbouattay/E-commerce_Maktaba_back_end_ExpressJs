const Model = require("../Models/index")
const donsController = {
    add : async (req,res)=>{
        try{
            const data = {
                discription : req.body.discription , 
                image : req.body.image, 
                etat : req.body.etat ,
                userId : req.body.userId
            }
           await Model.dons.create(data).then((dons)=>{
                if(dons!==null){
                    res.status(200).json({
                        success:true,
                        dons: dons
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
    update : async (req,res)=>{
        try{
            const data = {
                discription : req.body.discription , 
                image : req.body.image, 
                etat : req.body.etat
            }
            await Model.dons.update(data,{ 
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
            await Model.dons.destroy({
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                if(reponse){
                    res.status(200).json({
                        success:true,
                        message : " delete done"
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
            await Model.dons.findAll().then((dons)=>{
                    if(dons!==null){
                        res.status(200).json({
                            success:true,
                            dons: dons
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
    findOne : async (req,res)=>{
        try{
            await Model.dons.findOne({where:{id:req.params.id}})
            .then((dons)=>{
                if(dons!==null){
                    res.status(200).json({
                        success:true,
                        dons: dons
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
module.exports = donsController