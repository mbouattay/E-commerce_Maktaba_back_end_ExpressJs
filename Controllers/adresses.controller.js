const Model = require ("../Models/index")
const adressesController = {
    add : async( req , res) =>{
        try{
            const {Nom_de_adresse,Adresse,Gouvernorat,Ville,Code_postal,userId} = req.body
            const data = {
                Nom_de_adresse : Nom_de_adresse , 
                Adresse : Adresse , 
                Gouvernorat :Gouvernorat , 
                Ville :Ville , 
                Code_postal : Code_postal , 
                userId :userId 
            }
            Model.adresses.create(data).then((response) => {
                if(response!== null){
                    return  res.status(200).json({
                        success : true , 
                        message : "add addresse Done !! "
                    })
                }
            }).catch((err) => {
                return res.status(500).json({
                    success : false , 
                    message :" err add addresse " , 
                    error : err 
                })
            });
        }catch (err){
            return res.status(400).json({
                success : false , 
                error : err 
            })
        }
    },
    update : async (req, res)=>{
        try{
            const {Nom_de_adresse,Adresse,Gouvernorat,Ville,Code_postal} = req.body
            const data = {
                Nom_de_adresse : Nom_de_adresse , 
                Adresse : Adresse , 
                Gouvernorat :Gouvernorat , 
                Ville :Ville , 
                Code_postal : Code_postal , 
            }
            Model.adresses.update(data ,{where: {id: req.params.id ,userId : req.params.userId}}).then((response) => {
                if(response!=0){
                    return res.status(200).json({
                        success : true , 
                        message : " upadte addresse done !! " 
                    })
                }
                
            }).catch((err) => {
                    return res.status(200).json({
                        success : false , 
                        message : "err update addresse ", 
                        error : err
                    })
            });
        }catch(err){
            return res.status(400).json({
                success : false  , 
                error : err
            })
        }
    } , 
    delete : async (req , res)=>{
        try{
               Model.adresses.destroy({ where: {id : req.params.id, userId : req.params.userId}}).then((response) => {
                    if(response !=0 ){
                        return res.status(200).json({
                            success : true , 
                            message : "delete addresse done !! "
                        })
                    }
               }).catch((err) => {
                    return res.status(200).json({
                        success : false  , 
                        meesage : "err delete addreese",
                        err : err
                    })
               }); 
        }catch(err){
            return res.status(400).json({
                success : false , 
                err : err 
            })
        }
    }
}
module.exports = adressesController