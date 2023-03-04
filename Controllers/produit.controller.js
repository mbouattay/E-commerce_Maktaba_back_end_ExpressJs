const { response } = require("express");
const Model = require("../Models/index");
const produitController = {
  add: async (req, res) => {
    try {
      const { description, image, Qte, prix, userId,categorieId} = req.body;
      const produitData = {
        description: description,
        image: image,
        prix: prix,
        Qte: Qte,
        etat: "en_cours",
        categorieId :categorieId,
        userId: userId,
      };
      Model.produit.create(produitData).then((response) => {
        if (response !== null) {
          return res.status(200).json({
            success: true,
            message: " produit created",
          });
        }
      });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err,
        });
    }
  },
  update : async (req,res)=>{
    try{
        const { description, image, Qte, prix} = req.body;
        const produitData = {
            description: description,
            image: image,
            prix: prix,
            Qte: Qte,
        }
        Model.produit.update(produitData,{where: {id: req.params.id}}).then((response)=>{
            if (response!==0){
                return res.status(200).json({
                    success: true,
                    message : " update done ! "
                  });
            }else{
                return res.status(400).json({
                    success: false,
                    error: "error update ",
                  });  
            }
        })  

    }catch(err){
        return res.status(400).json({
            success: false,
            error: err,
        });
    }
  },
  delete : async (req,res)=>{
    try{
        Model.produit.destroy({
            where: {
              id: req.params.id
            }
          }).then((reponse)=>{
            if(reponse!==0){
                res.status(200).json({
                    success:true,
                    message : " produit deleted"
                }) 
            }
          })
    }catch(err){
        return res.status(400).json({
            success: false,
            error: err,
        });
    }
  },
  findAll : async (req , res)=>{
    try{
        Model.produit.findAll().then((response)=>{
            if(response!==null){
              res.status(200).json({
                success:true,
                produit : response
            }) 
            }
          })
    }catch(err){
        return res.status(400).json({
            success: false,
            error: err,
        });
    }
},
};
module.exports = produitController;
