const Model = require("../Models/index");
const bcrypt = require("bcrypt");
const sendMail = require("../config/Noemailer.config");
const { Sequelize } = require("sequelize");
const { response } = require("express");
const LabriarieController = {
  addlabrairie: async (req, res) => {
    try {
      const {email,fullname}=req.body;
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let Password = "";
      for (let i = 0; i < 25; i++) {
        Password += characters[Math.floor(Math.random() * characters.length)];
      }
      const passwordHash = bcrypt.hashSync(Password, 10);
      const datauser = {
        email: email,
        fullname: fullname,
        password: passwordHash,
        email_verifie: "verifie",
        role: "labrairie",
      };
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
    } catch (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  },
  findProfile: async (req, res) => {
    try {
      Model.labrairie
        .findOne({
          where: { id: req.params.id },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "userId",
             
            ],
          },
        })
        .then((response) => {
          if (response !== null) {
            res.status(200).json({
              success: true,
              profile: response,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "profile not find",
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
  updateProfile: async (req, res) => {
    try {
      req.body["image"] = req.files[0].filename;
      const {adresse,ville,nameLibrairie,telephone,facebook,instagram,image,emailLib}=req.body
      const data = {
        adresse :adresse,
        ville :ville,
        nameLibrairie :nameLibrairie,
        telephone : telephone,
        facebook : facebook , 
        instagram : instagram,
        imageStore: image,
        emailLib : emailLib
      }
      Model.labrairie.update(data,{where:{id:req.params.id}}).then((response)=>{
        if(response!==0){
          return res.status(200).json({
            success :true , 
            message : "update success"
          })
        }else{
          return res.status(400).json({
            success : false , 
            message: "error to update "
          })
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
module.exports = LabriarieController;
