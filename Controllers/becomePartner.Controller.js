const Model = require("../Models/index");
const BecomePartnerController = {
  add: async (req, res) => {
    try {
      if(req.files.length !== 0){
        req.body["file"] = req.files[0].filename;
      }else{
        req.body["file"]=null;
      }
      const {fullname,email,phone,Role,name_work,file,links,detail,pack,AdminId}=req.body;
        const data = {
            fullname : fullname , 
            email : email, 
            phone : phone , 
            Role : Role , 
            name_work : name_work , 
            file : file , 
            links : links , 
            detail : detail, 
            pack : pack, 
            AdminId:AdminId
        }
        Model.BecomePartner.create(data).then((response)=>{
            if(response!==undefined){
                return res.status(200).json({
                    success:true,
                    message : "votre demende bien recu " 
                })
            } else{
                return res.status(200).json({
                    success:true,
                    message : "votre demende bien recu " 
                })
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
module.exports = BecomePartnerController;
