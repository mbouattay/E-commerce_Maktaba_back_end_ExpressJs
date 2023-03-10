const Model = require ("../Models/index")
const commandeDetailController = {
    add: async (res,res)=>{
        try{
            
        }catch(err){
            return res.status(400).json({
                success : false , 
                message : err
            })
        }
    }
}
module.exports = commandeDetailController ; 