const Model = require("../Models/index")
const bcrypt = require("bcrypt");
const LabriarieController = {
    addlabrairie : async (req, res)=>{
        try{
            const { email, name} = req.body;
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
                  email_verifie: "verifie",
                  role: "labrairie",
                };
                Model.user.create(datauser).then((user) => {
                  if (user !== null) {
                    const dataLabriarie = {
                      fullname:name,
                      userId : user.id
                    }
                    Model.labrairie.create(dataLabriarie).then((labrairie)=>{
                      if(labrairie!==null){
                        return res.status(200).json({
                            success: true,
                            message: "success create labrairie",
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
module.exports=LabriarieController