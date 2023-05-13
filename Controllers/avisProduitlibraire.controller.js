const { response } = require("express");
const Model = require("../Models/index");
const avisProduitlibraire = require("../Models/avisProduitlibraire");
const { Sequelize } = require("sequelize");
const avisProduitlibraireController = {
  add: async (req, res) => {
    try {
      const { nbStart, commenter, clientId, produitlabrairieId } = req.body;
      const data = {
        nbStart: nbStart,
        commenter: commenter,
        clientId: clientId,
        produitlabrairieId: produitlabrairieId,
      };
      Model.avisProduitlibraire.create(data).then((response) => {
        if (response !== null) {
          return res.status(200).json({
            success: true,
            message: "avis created",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "err create avis",
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
      const { nbStart, commenter } = req.body;
      const data = {
        nbStart: nbStart,
        commenter: commenter,
      };
      Model.avisProduitlibraire
        .update(data, {
          where: { id: req.params.id },
        })
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "update avis done",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "err to update avis",
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
      Model.avisProduitlibraire
        .destroy({
          where: { id: req.params.id },
        })
        .then((response) => {
          if (response != 0) {
            return res.status(200).json({
              success: true,
              message: "delete avis  done !! ",
            });
          } else {
            return res.status(400).json({
              success: false,
              meesage: "err to  delete your avis",
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
  getAllAvisByClient: async (req, res) => {
    try {
      Model.avisProduitlibraire
        .findAll({
          where: { clientId: req.params.clientId },
          attributes: {
            exclude: ["updatedAt", "clientId", "produitlabrairieId"],
          },
          include: [
            {
              model: Model.produitlabrairie,
              attributes: ["id", "titre"],
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
              avis: response,
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
  getAllAvisByproduit: async (req, res) => {
    try {
      Model.avisProduitlibraire
        .findAll({
          where: { produitlabrairieId: req.params.produitlabrairieId },
          attributes: {
            exclude: ["updatedAt", "clientId", "produitlabrairieId"],
          },
          include: [
            {
              model: Model.client,
              attributes: ["id"],
              include: [
                { model: Model.user, attributes: ["fullname", "avatar"] },
              ],
            },
          ],
        })
        .then((response) => {
          if (response.length !== 0) {
            return res.status(200).json({
              success: true,
              avis: response,
            });
          } else {
            return res.status(400).json({
              success: false,
              error: "No Avis for this produitlabrairie",
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
  getAllavisBylibriarie: async (req, res) => {
    try {
      Model.avisProduitlibraire.findAll({
        include: [
          {
            model: Model.produitlabrairie,
            attributes:["titre"],
            include:[{model:Model.imageProduitLibrairie ,attributes:["name_Image"]}],
            where: { labrairieId:req.params.id} 
          },
          {
            model:Model.client,
            attributes:["id"],
            include:[{model:Model.user, attributes:["fullname","avatar"]}]
          }
        ],
      
        attributes:["nbStart","commenter","createdAt"],
        where: { '$produitlabrairie.id$': Sequelize.col('avisProduitlibraire.produitlabrairieId') }
      }).then((resp)=>{
        return res.status(200).json({
          success: true,
          avis: resp,
        });
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
};
module.exports = avisProduitlibraireController;
