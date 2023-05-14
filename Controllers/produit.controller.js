const { response } = require("express");
const Model = require("../Models/index");
const produitController = {
  add: async (req, res) => {
    try {
      req.body["image"] = req.file.filename;
      const {
        titre,
        description,
        image,
        Qte,
        prix,
        prix_en_gros,
        fournisseurId,
        categorieId,
      } = req.body;
      const produitData = {
        titre: titre,
        description: description,
        image: image,
        prix: prix,
        prix_en_gros: prix_en_gros,
        Qte: Qte,
        etat: "en_cours",
        categorieId: categorieId,
        fournisseurId: fournisseurId,
      };
      Model.produit.create(produitData).then((response) => {
        if (response !== null) {
          return res.status(200).json({
            success: true,
            message: " produit created",
          });
        } else {
          return res.status(400).json({
            success: true,
            message: "  err creation produit",
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: "aaa",
      });
    }
  },
  update: async (req, res) => {
    try {
      req.body["image"] = req.file.filename;
      const { description, image, Qte, prix, titre } = req.body;
      const produitData = {
        description: description,
        titre: titre,
        image: image,
        prix: prix,
        Qte: Qte,
      };
      Model.produit
        .update(produitData, { where: { id: req.params.id } })
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: " update done ! ",
            });
          } else {
            return res.status(400).json({
              success: false,
              error: "error update ",
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
      Model.produit
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then((reponse) => {
          if (reponse !== 0) {
            res.status(200).json({
              success: true,
              message: " produit deleted",
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
      Model.produit
        .findAll({
          attributes:["id","titre","prix_en_gros","Qte","image"],
          include: [
            {
              model: Model.fournisseur,
              attributes:["id","telephone"],
              include: [
                { model: Model.user, attributes: ["id", "fullname", "avatar"] },
              ],
            },
          ],
        })
        .then((response) => {
          if (response !== null) {
            res.status(200).json({
              success: true,
              produit: response,
            });
          } else {
            res.status(400).json({
              success: false,
              err: " zero produit",
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
  findAllProduitByfournisseur: async (req, res) => {
    try {
      Model.produit
        .findAll({ where: { fournisseurId: req.params.id } })
        .then((response) => {
          if (response !== null) {
            res.status(200).json({
              success: true,
              produit: response,
            });
          } else {
            res.status(400).json({
              success: false,
              err: " fournisseur have zero produit",
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
module.exports = produitController;
