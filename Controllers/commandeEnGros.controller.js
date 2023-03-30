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
    findcommandeByLabriarie: async(req,res)=>{
        try{
            Model.commandeEnGros.findAll({where :{labrairieId:req.params.id},include:[{model:Model.fournisseur,attributes:['id'],include:[{model:Model.user,attributes:['fullname']}]},{model : Model.produit,attributes:['titre','description','image','prix','prix_en_gros']}]}
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