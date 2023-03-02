const Model = require("../Models/index")
const produitController = {
    add : async (req,res)=>{
        try{
            req.body["image"]=req.file.filename;
            const data = {
                name : req.body.name , 
                description : req.body.description,
                prix : req.body.prix , 
                Qte : req.body.Qte , 
                prix_G : req.body.prix_G ,
                image : req.body.image, 
                categorieId : req.body.categorieId , 
                userId : req.body.userId
            }
            await Model.produit.create(data).then((reponse)=>{
                if(reponse!==null){
                    res.status(200).json({
                        success:true,
                        produit: reponse,
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
                name : req.body.name , 
                discription : req.body.discription,
                prix : req.body.prix , 
                Qte : req.body.Qte , 
                prix_G : req.body.prix_G , 
                categorieId : req.body.categorieId
            }
            await Model.produit.update(data,{ 
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                    if(reponse){
                        res.status(200).json({
                            success:true,
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
            await Model.produit.destroy({
                where: {
                  id: req.params.id
                }
              }).then((reponse)=>{
                if(reponse){
                    res.status(200).json({
                        success:true,
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
            await Model.produit.findAll().then((produit)=>{
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
    findOne: async (req,res)=>{
        try{
            await Model.produit.findOne({where:{id:req.params.id}})
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
    }
}
module.exports=produitController ;