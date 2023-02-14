const adminModel = require ('../Models/adminModel')
const entrpriseController = ('./entrpriseController')
const entrepriseModel = require('../Models/entrepriseModel')
const bcrypt = require('bcrypt')


module.exports={
registre : async (req , res)=>{
try {
    const salt =bcrypt.genSalt(6)
    const hash = bcrypt.hashSync(req.body.password, parseInt(salt))
   const  admin = new adminModel({
        ...req.body,
        password:hash
    })
   await admin.save(req.body ,(err , item)=>{
        if (err){
            res.status(400).json({succes:false , message:"error to registre", err})
        }else{
            res.status(200).json({succes:true , message:"registre succufuly" , data:item})
        }
    })
}
 catch (error) {
    res.status(404).json({message:"failed"})
    
}

},
ValiderEntrprise : async (req , res)=>{
    const entreprise = await entrepriseModel.findById(req.params.id).exec((err , item)=>{
        entreprise.State=true
        entreprise.save()
        if (err){
                            res.status(400).json({success:false,message:"failed",err})

        }
        else {
            res.status(200).json({
                succes:true,
                data:item
            })
        }
    })
}

}
