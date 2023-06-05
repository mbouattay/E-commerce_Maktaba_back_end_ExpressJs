const { response } = require("express");
const Model = require("../Models/index");
const CatalogeController = {
  add: async (req, res) => {
    try {
      req.body["image"] = req.files;
      const { titre, description, prix, image,etat, AdminId, categorieId,SouscategorieId} =
        req.body;
      const data = {
        titre: titre,
        description: description,
        prix: prix,
        etat: etat,
        AdminId: AdminId,
        categorieId: categorieId,
        SouscategorieId:SouscategorieId
      };
      const images = [];
      Model.cataloge.create(data).then((response) => {
        if (response !== null) {
          image.map((e) => {
            images.push({
              name_Image: e.filename,
              catalogeId: response.id,
            });
          });
          Model.imageCataloge.bulkCreate(images).then((response) => {
            if (response !== null) {
              return res.status(200).json({
                success: true,
                message: "Done !! ",
              });
            } else {
              return res.status(400).json({
                success: false,
                error: "error",
              });
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "error to create cataloge",
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
  findAll: async (req, res) => {
    try {
      Model.cataloge
        .findAll({
          attributes: {
            exclude: ["updatedAt", "AdminId","categorieId"],
          },
          include: [
            { model: Model.imageCataloge, attributes: ["id","name_Image"]},
            { model: Model.categorie, attributes: ["id", "name"] },
          ],
        })
        .then((response) => {
          if (response !== null) {
            return res.status(200).json({
              success: true,
              produits: response,
            });
          } else {
            return res.status(200).json({
              success: false,
              produits: [],
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
  findOne: async (req, res) => {
    try {
      Model.cataloge
        .findOne({
          where: { id: req.params.id },
          include: [
            { model: Model.imageCataloge, attributes: ["id","name_Image"] },
            { model: Model.categorie, attributes: ["id", "name"] },
            { model: Model.Souscategorie, attributes: ["id", "name"] },
          ],
        })
        .then((response) => {
          if (response !== null) {
            return res.status(200).json({
              success: true,
              produits: response,
            });
          } else {
            return res.status(200).json({
              success: false,
              produits: [],
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
  delete : async (req,res)=>{
    try{
        Model.cataloge.destroy({
            where: {
              id: req.params.id,
            },
          }).then((response)=>{
            if(response!=0){
                return res.status(200).json({
                    success: true,
                    message: " produit deleted",
                  });
            }else{
                return res.status(400).json({
                    success: false,
                    message: " produit deleted",
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
  changeVisibilite : async(req,res)=>{
    try{
      Model.cataloge.update({etat:req.body.etat},{where:{id:req.params.id}}).then((response)=>{
        if(response!==0){
          return res.status(200).json({
            success: true,
            message: "  change etat produi tDone",
          });
        }else{
          return res.status(200).json({
            success: false,
            message : "error to change etat "
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
  update :async(req,res)=>{
    try{
      if(req.image!==undefined){
        req.body["image"] = req.files;
      }
      const { titre, description, prix, image,categorieId } = req.body;
      const data = {
        titre : titre,
        description : description , 
        prix : prix , 
        categorieId : categorieId ,
      }
      Model.cataloge.update(data,{where:{id:req.params.id}}).then((response)=>{
          if(response!=0){
            image.map((e)=>{
              Model
            })
            return res.status(200).json({
              success: true,
              message: "   update Done",
            });
          }else{
            return res.status(200).json({
              success: true,
              message: "error to update produit",
            });
          }
      })
    }catch(err){
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
};
module.exports = CatalogeController;
