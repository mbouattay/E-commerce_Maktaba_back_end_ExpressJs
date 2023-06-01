const { response } = require("express");
const Model = require("../Models/index");
const bcrypt = require("bcrypt");
const sendMail = require("../config/Noemailer.config");
const fournisseur = require("../Models/fournisseur");
const BecomePartnerController = {
  add: async (req, res) => {
    try {
      if (req.files.length !== 0) {
        req.body["file"] = req.files[0].filename;
      } else {
        req.body["file"] = null;
      }
      const {
        fullname,
        email,
        phone,
        Role,
        name_work,
        file,
        links,
        detail,
        pack,
        AdminId,
      } = req.body;
      const data = {
        fullname: fullname,
        email: email,
        phone: phone,
        Role: Role,
        name_work: name_work,
        file: file,
        links: links,
        detail: detail,
        pack: pack,
        etat: "en_cours",
        AdminId: AdminId,
      };
      Model.BecomePartner.create(data).then((response) => {
        if (response !== undefined) {
          return res.status(200).json({
            success: true,
            message: "votre demende bien recu ",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "votre demende bien recu ",
          });
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  findAll: async (req, res) => {
    try {
      Model.BecomePartner.findAll({
        attributes: {
          exclude: ["AdminId", "updatedAt"],
        },
      }).then((response) => {
        return res.status(200).json({
          success: true,
          demende: response,
        });
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  accepte: async (req, res) => {
    try {
      const { Role, username, email } = req.body;
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let Password = "";
      for (let i = 0; i < 25; i++) {
        Password += characters[Math.floor(Math.random() * characters.length)];
      }
      const passwordHash = bcrypt.hashSync(Password, 10);
      switch (Role) {
        case "Librairie":
          const datauser = {
            email: email,
            fullname: username,
            password: passwordHash,
            email_verifie: "verifie",
            role: "labrairie",
          };
          Model.user.findOne({where:{email:email}}).then((response)=>{
            if(response===null){
              Model.user.create(datauser).then((user) => {
                if (user !== null) {
                  const dataLabriarie = {
                    id: user.id,
                    userId: user.id,
                  };
                  Model.labrairie.create(dataLabriarie).then((labrairie) => {
                    sendMail.acceptationDemendePartenariat(email, Password);
                    if (labrairie !== null) {
                      return res.status(200).json({
                        success: true,
                        message: "success create labrairie",
                      });
                    }
                  });
                }
              });
            }else{
              sendMail.DemendePartenariatRejected(email)
              return res.status(200).json({
                success: false,
                message: "email exist ",
              });
            }
          })
          break;
        case "Fournisseur":
          const datauser1 = {
            email: email,
            fullname:username,
            password: passwordHash,
            email_verifie: "verifie",
            role: "fournisseur",
          };
          Model.user.findOne({where:{email:email}}).then((response)=>{
            if(response===null){
              Model.user.create(datauser1).then((user) => {
                if (user !== null) {
                  const datafournisseur = {
                    id: user.id,
                    userId: user.id,
                  };
                  Model.fournisseur.create(datafournisseur).then((fournisseur) => {
                    sendMail.acceptationDemendePartenariat(email, Password);
                    if (fournisseur !== null) {
                      return res.status(200).json({
                        success: true,
                        message: "success create fournsisseur",
                      });
                    }
                  });
                }
              });
            }else{
              sendMail.DemendePartenariatRejected(email)
              return res.status(400).json({
                success: false,
                message: "email exist ",
              });
            }
          })
          break;
        default:
          const datauser2 = {
            email: email,
            fullname:username,
            password: passwordHash,
            email_verifie: "verifie",
            role: "partenaire",
          };
          Model.user.findOne({where:{email:email}}).then((response)=>{
            if(response===null){
              Model.user.create(datauser2).then((user) => {
                if (user !== null) {
                  const datapartenaire = {
                    id: user.id,
                    userId: user.id,
                  };
                  Model.partenaire.create(datapartenaire).then((partainer) => {
                    sendMail.acceptationDemendePartenariat(email, Password);
                    if (partainer !== null) {
                      return res.status(200).json({
                        success: true,
                        message: "success create partainer",
                      });
                    }
                  });
                }
              });
            }else{
              sendMail.DemendePartenariatRejected(email)
              return res.status(400).json({
                success: false,
                message: "email exist ",
              });
            }
          })
          break;
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  Annuler : async (req,res)=>{
    try {
      Model.BecomePartner
        .update(
          { etat:"Annuler"},
          { where:{id:req.params.id }}
        )
        .then((response) => {
          if (response !== 0) {
            return res.status(200).json({
              success: true,
              message: "demende  Annuler",
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "error",
            });
          }
        });
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
};

module.exports = BecomePartnerController;
