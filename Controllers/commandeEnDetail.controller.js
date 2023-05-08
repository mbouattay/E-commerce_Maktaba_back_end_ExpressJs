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
            exclude: [
              "updatedAt",
              "userId",
              "labrairieId"
            ],
          },
          include: [
            {
              model: Model.labrairie,
              attributes:["id","nameLibrairie","imageStore"]
            },
            {
              model: Model.produitlabrairie,
             attributes: [  
                "titre",
                "prix"
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
          include: [
            {
              model: Model.labrairie,
              attributes: ["id"],
              include: [{ model: Model.user, attributes: ["fullname"] }],
            },
            {
              model: Model.produitlabrairie,
              attributes: ["titre", "description", "image", "prix"],
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
        err: err,
      });
    }
  },
};
module.exports = commandeDetailController;
