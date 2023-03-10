const { response } = require("express")
const Model = require("../Models/index")
const commandeEnGrosController = {
    add : async (req,res)=>{
            try {
                const {total_ttc,produits,labrairieId,fournisseurId} = req.body
                const commandeData = {
                    total_ttc : total_ttc , 
                    etat : "en cours", 
                    labrairieId : labrairieId,
                    fournisseurId : fournisseurId
                }
                Model.commandeEnGros.create(commandeData).then((response)=>{
                    if(response !== null){
                        produits.map((e)=>{
                            e.commandeEnGroId = response.id
                        })
                        Model.ProduitCommandeEnGros.bulkCreate(produits).then((response)=>{
                            if(response !==null){
                                return res.status(200).json({
                                    success : true , 
                                    message :" add commande en gros Done !!"
                                })
                            }else{
                                return res.status(400).json({
                                        success : false , 
                                        message : " error lorsque l'ajoute d'une commande " 
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