const { response } = require("express");
const Model = require("../Models/index");
const { Sequelize, where, Op } = require("sequelize");
const commandeDetailController = {
  add: async (req, res) => {
    try {
      const { commande } = req.body;
      commande.map((data) => {
        let commandes = {
          total_ttc: data.total_ttc,
          etatClient: "en cours",
          etatVender: "Nouveau",
          Adresse: data.Adresse,
          Mode_liv: data.Mode_liv,
          Mode_pay: data.Mode_pay,
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
                data.produits.map((e) => {
                  Model.produitlabrairie
                    .findByPk(e.produitlabrairieId)
                    .then((produit) => {
                      if (produit !== null) {
                        const updatedQte = produit.qte - e.Qte;
                        if (updatedQte < 0) {
                          updatedQte = 0;
                        }
                        return Model.produitlabrairie.update(
                          { qte: updatedQte },
                          { where: { id: e.produitlabrairieId } }
                        );
                      }
                    });
                });
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
              attributes: ["id", "titre", "prix"],
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
              attributes: ["fullname", "avatar", "telephone", "email"],
              include: [
                {
                  model: Model.client,
                  attributes: ["id"],
                  include: [{ model: Model.adresses }],
                },
              ],
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
          attributes: ["id", "total_ttc", "etatVender", "createdAt"],
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
  Annuler: async (req, res) => {
    try {
      Model.commandeEnDetail
        .update(
          {
            Data_rejetée: new Date(),
            etatClient: "Annule",
            etatVender: "Rejeter",
          },
          { where: { id: req.params.id } }
        )
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "commande Annuler",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "error Annuler commande ",
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
  Accepter: async (req, res) => {
    try {
      Model.commandeEnDetail
        .update(
          { data_acceptation: new Date(), etatVender: "En cours" },
          { where: { id: req.params.id } }
        )
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "commande accepte",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "error accepte commande ",
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
  livre: async (req, res) => {
    try {
      Model.commandeEnDetail
        .update(
          {
            Date_préparée: new Date(),
            etatClient: "livre",
            etatVender: "Compléter",
          },
          { where: { id: req.params.id } }
        )
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "commande livre",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "error livre commande ",
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
  addArticle: async (req, res) => {
    try {
      const { Qte, produitlabrairieId, commandeEnDetailId, prix } = req.body;
      const data = {
        Qte: Qte,
        produitlabrairieId: produitlabrairieId,
        commandeEnDetailId: commandeEnDetailId,
      };
      Model.ProduitCommandeEnDetail.findOne({
        where: {
          produitlabrairieId: produitlabrairieId,
          commandeEnDetailId: commandeEnDetailId,
        },
      }).then((response) => {
        if (response !== null) {
          const newQte = Number(response.Qte) + Number(Qte);
          Model.commandeEnDetail
            .findOne({ where: { id: commandeEnDetailId } })
            .then((response) => {
              if (response !== null) {
                const newPrix = response.total_ttc + Qte * prix;
                Model.commandeEnDetail
                  .update(
                    { total_ttc: newPrix },
                    { where: { id: commandeEnDetailId } }
                  )
                  .then((response) => {
                    if (response !== 0) {
                      Model.ProduitCommandeEnDetail.update(
                        { Qte: newQte },
                        {
                          where: {
                            produitlabrairieId: produitlabrairieId,
                            commandeEnDetailId: commandeEnDetailId,
                          },
                        }
                      ).then((response) => {
                        if (response !== 0) {
                          return res.status(200).json({
                            success: true,
                            message: "prod add",
                          });
                        }
                      });
                    }
                  });
              }
            });
        } else {
          Model.ProduitCommandeEnDetail.create(data).then((response) => {
            if (response !== null) {
              Model.commandeEnDetail
                .findOne({ where: { id: commandeEnDetailId } })
                .then((response) => {
                  if (response !== null) {
                    const newTot = Number(response.total_ttc) + prix * Qte;
                    Model.commandeEnDetail
                      .update(
                        { total_ttc: newTot },
                        { where: { id: commandeEnDetailId } }
                      )
                      .then((response) => {
                        if (response !== 0) {
                          return res.status(200).json({
                            success: true,
                            message: "prod add",
                          });
                        }
                      });
                  }
                });
            } else {
              return res.status(400).json({
                success: false,
                message: "error to add prod",
              });
            }
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
  deleteArticle: async (req, res) => {
    try {
      Model.ProduitCommandeEnDetail.destroy({
        where: {
          produitlabrairieId: req.params.produitlabrairieId,
          commandeEnDetailId: req.params.commandeEnDetailId,
        },
      }).then((response) => {
        if (response !== 0) {
          Model.ProduitCommandeEnDetail.findAll({
            where: { commandeEnDetailId: req.params.commandeEnDetailId },
          }).then((response) => {
            if (response.length === 0) {
              Model.commandeEnDetail.destroy({
                where: { id: req.params.commandeEnDetailId },
              });
            }
          });
          return res.status(200).json({
            success: true,
            message: " produit deleted",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: " produit deleted",
          });
          return res.status(400).json({
            success: false,
            message: " error deleted",
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
  nb_commande_par_jour: async (req, res) => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      Model.commandeEnDetail
        .findAll({
          attributes: [
            "createdAt",
            [
              Sequelize.fn("COUNT", Sequelize.col("commandeEnDetail.id")),
              "nombre_commandes",
            ],
          ],
          where: {
            createdAt: {
              [Op.gte]: sevenDaysAgo,
            },
            labrairieId: req.params.id,
          },
          group: ["createdAt"],
          raw: true,
        })
        .then((response) => {
          if(response!==null){
            return res.status(200).json({
              success: true,
              commandes: response,
            });
          }else{
            return res.status(200).json({
              success: false,
              commandes:[],
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
  produit_plus_vendus: async (req, res) => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      Model.commandeEnDetail.findAll({
        attributes:[],
        include: [{
          model: Model.produitlabrairie,
          attributes: ["titre", [Sequelize.fn('COUNT', Sequelize.col('titre')), 'total_ventes']],
          through: { attributes: [] } ,
          include:[{model:Model.imageProduitLibrairie , attributes:["name_Image"]}]
        }],
        where: {
          createdAt: {
            [Op.gte]: thirtyDaysAgo
          },
          labrairieId: req.params.id,
        },
        group:["id"],
        order :["createdAt"],
     
      }).then((response)=>{
        if(response!==null){
          return res.status(200).json({
            success: true,
            produit: response,
          });
        }else{
          return res.status(200).json({
            success: false,
            produit:[],
          });
        } 
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
};
module.exports = commandeDetailController;
