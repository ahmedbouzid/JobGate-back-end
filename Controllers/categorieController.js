const categorieModel = require('../Models/CategorieModel')



module.exports={

create : async (req , res)=>{

    try {
        const categorie = new categorieModel(req.body)
    await categorie.save(req.body,(err , item)=>{
        if (err){
            res.status(400)
            .json({succes:true , message:'Failed to create',err
        })
        }
        else {
            res.status(200)
            .json({succes:true, message:'categorie creation succufully',
        data:item})
        }
    })
    } catch (error) {
        res.status(500)
        .json({message:"error" , error})
    }
},
getAll : async (req , res)=>{
    try {
        await categorieModel.find({}).exec((err , item)=>{
            if(err){
                res.status(400).json({succes:false , 
                    message:"Failed to get All categorie", err})
            }
            else{
                res.status(200).json({succes:true , message:"succes", data:item})
            }
        })
    } catch (error) {
        res.status(500)
        .json({succes:false , error})
        
    }
},
update:async(req , res)=>{
    try {
        await categorieModel.findByIdAndUpdate
        (req.params.id , req.body ,{new :true})
        .exec((err , item)=>{
            if (err){
            res.status(400)
            .json({succes:false , message:"Failed to update" , err})
                    }
            else {
                res.status(200)
                .json({succes:true , message:"Update succufully " , data:item})
            }        
        })
    } catch (error) {
       res.status(500).json({message:"Failed" , error}) 
    }
},
delete:async(req,res)=>{
   try {
    await categorieModel.findByIdAndDelete(req.params.id).
    exec((err)=>{
        if (err){
            res.status(400).json({message:"Failed to delete" ,err})
        }
        else{
            res.status(200).json({succes:true , message:"Delete Succufully"})
        }
    })
   } catch (error) {
    res.status(500).json({succes:false , error})
    
   } 
},
getById:async(req,res)=>{
    try {
      await categorieModel.findById(req.params.id).exec((err,item)=>{
            if(err){
             res.status(400).json({success:false,message:"failed",err})
            }else{
              res.status(200).json({success:true,message:"success",data:item})
            }
      })
    } catch (error) {
      res.status(400).json({success:false,message:"failed",err})
    }
  }

}