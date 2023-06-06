const { Sequelize } = require("sequelize");
const Model = require("../Models/index");
const SousCategorieController = {
  add: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        Description:req.body.Description,
        categorieId:req.body.categorieId
      };
      await Model.Souscategorie.create(data).then((reponse) => {
        if (reponse !== null) {
          res.status(200).json({
            success: true,
            Souscategorie:reponse
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
  update: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
      };
      await Model.Souscategorie
        .update(data, {
          where: {
            id: req.params.id,
          },
        })
        .then((reponse) => {
          if (reponse) {
            res.status(200).json({
              success: true,
              message: "update done",
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
  delete: async (req, res) => {
    try {
      await Model.Souscategorie
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then((reponse) => {
          if (reponse !== 0) {
            res.status(200).json({
              success: true,
              message: "delete done",
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
  find: async (req, res) => {
    try {
      await Model.Souscategorie.findAll().then((categorie) => {
        res.status(200).json({
          success: true,
          categorie: categorie,
        });
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  findByCategorie : async(req,res)=>{
    try{
      Model.Souscategorie.findAll({where:{categorieId:req.params.id}}).then((response)=>{
        if(response!==null){
         return res.status(200).json({
            success: true,
            categorie: response,
          });
        }else{
          return res.status(200).json({
            success: false,
            categorie: [],
          });
        }
      })
    }catch(error){
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }

};
module.exports = SousCategorieController;
