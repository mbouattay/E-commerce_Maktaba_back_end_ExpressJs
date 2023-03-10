const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const sendMail = require("../config/Noemailer.config");
const fournisseurController = {
    addfournisseur : async (req, res)=>{
        try{
            const { email, fullname} = req.body;
                const characters =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let Password = "";
                for (let i = 0; i < 25; i++) {
                  Password +=
                    characters[Math.floor(Math.random() * characters.length)];
                }
                const passwordHash = bcrypt.hashSync(Password, 10);
                const datauser = {
                  email: email,
                  fullname:fullname,
                  password: passwordHash,
                  email_verifie: "verifie",
                  role: "fournisseur",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const datafournisseur = {
                      id : user.id,
                      userId : user.id
                    }
                    Model.fournisseur.create(datafournisseur).then((fournisseur)=>{
                      if(fournisseur!==null){
                        sendMail.acceptationDemendePartenariat(email,Password)
                        return res.status(200).json({
                            success: true,
                            message: "success create fournisseur",
                          });
                        }
                    })
                  }
                });  
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
        
    }
}
module.exports=fournisseurController