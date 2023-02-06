const usermodel = require ("../Models/index") ; 
const userController ={
    create : async (req,res)=>{
        try{
            const send = await usermodel.user.create({ username: "Jane"});
            return res.status(200).json({
                success: true,
                user: send
            })
        }catch(err){
            return res.status(400).json({
                success:false,
                error: err
            })
        }
    },
    update : async (req,res)=>{
       

    },
    find : async (req,res)=>{
      
    },
    delete : async (req,res)=>{
        
    },
}
module.exports = userController ; 