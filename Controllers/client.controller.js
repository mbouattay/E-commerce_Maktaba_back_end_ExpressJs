const { where } = require("sequelize");
const Model = require("../Models/index");
const clientController = {
  findOneClient: async (req, res) => {
    try {
      Model.user
        .findOne({
          where: { id: req.params.id },
          attributes: { exclude: ["password", "createdAt", "updatedAt","email_verifie","role"] },
          include: [
            {
              model: Model.client,
              attributes: ["id"],
              include: [
                {
                  model: Model.adresses,
                  attributes: {
                    exclude: ["clientId", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        })
        .then((response) => {
          if (response !== null) {
            return res.status(200).json({
              success: true,
              client: response,
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "client introuvable",
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
module.exports = clientController;
