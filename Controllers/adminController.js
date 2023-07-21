const Model = require("../Models/index");
const bcrypt = require("bcrypt");
const adminController = {
  add:async(req, res) => {
    try {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
          const datauser = {
            fullname : req.body.fullname,
            email: req.body.email,
            password: passwordHash,
            email_verifie: "verifie",
            etatCompte:"active",
            role : "Admin"
          };
          Model.user.create(datauser).then((user) => {
            if (user !== null) {
              const dataAdmin={
                id : user.id, 
                userId : user.id
              }
              Model.admin.create(dataAdmin).then((client)=>{
                if(client!==null){
                  res.status(200).json({
                    success: true, 
                    message: "Admin created",
                  });
                }else{
                    res.status(400).json({
                        success: false, 
                        message: "error to add admin",
                      });
                }
              })
            }else{
                res.status(400).json({
                    success: false, 
                    message: "error to add admin",
                  });
            }
          })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err,
        });
    }
  },
};
module.exports = adminController;
