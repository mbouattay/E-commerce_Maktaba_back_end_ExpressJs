const { response } = require("express");
const Model = require("../Models/index");
const { Sequelize } = require("sequelize");
const commandeDetailController = {
  add: async (req, res) => {
    try {
      const { commande } = req.body;
      commande.map((data) => {
        let commandes = {
          total_ttc: data.total_ttc,
          etat: "en cours",
          userId: data.userId,
          labrairieId: data.labrairieId,
        };
        Model.commandeEnDetail.create(commandes).then((response) => {
          if (response !== null) {
            data.produits.map((e) => {
              e.commandeEnDetailId = response.id;
            });
            Model.ProduitCommandeEnDetail.bulkCreate(data.produits).then(
              (response) => {
                if (response === null) {
                  return res.status(400).json({
                    success: false,
                    message: " error lorsque l'ajoute de produit",
                  });
                }
              }
            );
          } else {
            return res.status(400).json({
              success: false,
              message: " error lorsque l'ajoute de commande",
            });
          }
        });
      });
      return res.status(200).json({
        success: true,
        message: " add commande en  detail  Done !!",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  findCommandeByuser: async (req, res) => {
    try {
      Model.commandeEnDetail
        .findAll({
          where: { userId: req.params.id },
          attributes: {
            exclude: ["updatedAt", "userId", "labrairieId"],
          },
          include: [
            {
              model: Model.labrairie,
              attributes: ["id", "nameLibrairie", "imageStore"],
            },
            {
              model: Model.produitlabrairie,
              attributes: ["titre", "prix"],
              include: [
                {
                  model: Model.imageProduitLibrairie,
                  attributes: ["name_Image"],
                },
              ],
            },
          ],
        })
        .then((response) => {
          if (response !== null) {
            return res.status(200).json({
              success: true,
              commandes: response,
            });
          } else {
            return res.status(400).json({
              success: false,
              err: "  zero commande trouve ",
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
  findOneCommande: async (req, res) => {
    try {
      Model.commandeEnDetail
        .findAll({
          where: { id: req.params.id },
          attributes: {
            exclude: ["updatedAt", "userId", "labrairieId"],
          },
          include: [
            {
              model: Model.produitlabrairie,
              attributes: ["titre", "description", "prix"],
              include: [
                {
                  model: Model.imageProduitLibrairie,
                },
              ],
            },
            {
              model: Model.user,
              attributes: ["fullname", "avatar","telephone","email"],
              include: [{ model: Model.client, attributes: ["id"] , include:[{model:Model.adresses}]}],
            },
          ],
          order: [["createdAt", "ASC"]],
        })
        .then((response) => {
          if (response !== null) {
            return res.status(200).json({
              success: true,
              commandes: response,
            });
          } else {
            return res.status(400).json({
              success: false,
              err: "  zero commande trouve ",
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        err: err,
      });
    }
  },
  findCommandeBylibrairie: async (req, res) => {
    try {
      Model.commandeEnDetail
        .findAll({
          where: { labrairieId: req.params.labrairieId },
          attributes: ["id", "total_ttc", "etat", "createdAt"],
          include: [
            { model: Model.user, attributes: ["fullname", "avatar"] },

            {
              model: Model.produitlabrairie,
              attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("titre")), "nb_Article"],
              ],
            },
          ],
          group: ["commandeEnDetail.id"],
          order: [["createdAt", "ASC"]],
        })
        .then((response) => {
          if (response.length != 0) {
            return res.status(200).json({
              success: true,
              commandes: response,
            });
          } else {
            return res.status(400).json({
              success: false,
              err: "  zero commande trouve ",
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
  Annuler : async(req,res)=>{
      try{

      }catch(err){
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
  },
  Accepter: async(req,res)=>{
    try{

    }catch(err){
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  livre: async(req,res)=>{
    try{

    }catch(err){
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
};
module.exports = commandeDetailController;
