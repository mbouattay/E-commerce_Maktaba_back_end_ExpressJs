const { Sequelize } = require("sequelize");
const Model = require("../Models/index");
const SousCategorieController = {
  add: async (req, res) => {
    try {
      
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

};
module.exports = SousCategorieController;
