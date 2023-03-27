const { response } = require("express")
const Model = require("../Models/index")
const commandeEnGrosController = {
    add : async (req,res)=>{
        try {
            const {commande} = req.body ;
            commande.map((data)=>{
                let commandes={
                    total_ttc : data.total_ttc , 
                    etat : "en cours" ,
                    fournisseurId : data.fournisseurId,
                    labrairieId : data.labrairieId
                }
                Model.commandeEnGros.create(commandes).then((response)=>{
                    if(response!==null){
                        data.produits.map((e)=>{
                            e.commandeEnGroId = response.id
                        })
                        Model.ProduitCommandeEnGros.bulkCreate(data.produits).then((response)=>{
                            if(response===null){
                                return res.status(400).json({
                                    success : false , 
                                    message : " error lorsque l'ajoute de produit" 
                                })
                            }
                        })
                    }else{
                        return res.status(400).json({
                            success : false , 
                            message : " error lorsque l'ajoute d'une commande " 
                        })
                    }
                    
                })
            })
            return res.status(200).json({
                success : true , 
                message :" add commande en gros Done !!"
            })
            }catch(err){
                return res.status(400).json({
                    success:false,
                    error: err
                })
            }
    },
    findAll : async(req,res)=>{
        try{
            Model.commandeEnGros.findAll({  include: [{model:Model.labrairie , include :[Model.user]}] }
            ).then((response)=>{
                if(response!==null){
                    return res.status(200).json({
                        success : true , 
                        commande : response 
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
module.exports = commandeEnGrosController