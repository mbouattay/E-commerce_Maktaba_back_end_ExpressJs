const { response } = require("express");
const Model = require("../Models/index");
const produitController = {
  add: async (req, res) => {
    try {
      req.body["image"]=req.file.filename
      const { titre,description, image, Qte, prix, labrairieId,categorieId} = req.body;
      const produitData = {
        titre : titre ,
        description: description,
        image: image,
        prix: prix,
        Qte: Qte,
        etat: "en_cours",
        categorieId :categorieId,
        labrairieId: labrairieId,
      };
      Model.produitlabrairie.create(produitData).then((response) => {
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
        req.body["image"]=req.file.filename
        const { description, image, Qte, prix} = req.body;
        const produitData = {
            description: description,
            image: image,
            prix: prix,
            Qte: Qte,
        }
        Model.produitlabrairie.update(produitData,{where: {id: req.params.id}}).then((response)=>{
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
        Model.produitlabrairie.destroy({
            where: {
              id: req.params.id
            }
          }).then((reponse)=>{
            if(reponse!==0){
              return  res.status(200).json({
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
        Model.produitlabrairie.findAll({include : [{model : Model.labrairie,attributes:["avatar"],include:[{model:Model.user,attributes:["fullname"]}]},{model:Model.categorie}]}).then((response)=>{
            if(response!==null){
             return res.status(200).json({
                success:true,
                produit : response
            }) 
            }else{
              return res.status(400).json({
                success:false,
                err : " zero produit"
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
  findAllProduitByLabrairie : async (req, res)=>{
    try{
        Model.produitlabrairie.findAll({ where: { labrairieId: req.body.labrairieId }}).then((response)=>{
          if(response!==null){
            res.status(200).json({
              success:true,
              produit : response
          }) 
          }else{
            res.status(400).json({
              success:false,
              err : " labrairieId have zero produit"
          }) 
          }
        })
    }catch(err){
      return res.status(400).json({
        success : false , 
        err : err
      })
    }
  },
  findOneProduit : async (req,res)=>{
    try{
        const {id} = req.params
        Model.produitlabrairie.findOne({where : {id:id} ,
          include : [{model : Model.labrairie,attributes:["telephone","avatar","facebook","instagram"],
                      include:[{model:Model.user,attributes:["fullname","email"],
                      include:[Model.adresses]}]},{model:Model.avisProduitlibraire}]}).then((response)=>{
          if(response!==null){
           return res.status(200).json({
              success:true,
              produit : response
          }) 
          }else{
           return res.status(400).json({
              success:false,
              err : " error produit ne exist pas "
          }) 
          }
        })
    }catch(err){
      return res.status(400).json({
        success : false , 
        err : err 
      })
    }
  }
};
module.exports = produitController;