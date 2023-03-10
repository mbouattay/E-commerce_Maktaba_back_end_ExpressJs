const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const clientController = {
    addClient : async (req, res)=>{
        try{
            const {email, name} = req.body;
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
                  password: passwordHash,
                  fullname:name,
                  email_verifie: "verifie",
                  role: "client",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const dataClient = {
                      id : user.id,
                      userId : user.id
                    }
                    Model.client.create(dataClient).then((client)=>{
                      if(client!==null){
                        return res.status(200).json({
                            success: true,
                            message: "success create client",
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
module.exports=clientController