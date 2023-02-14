const offreModel = require('../Models/offreModel')
const entrepriseModel = require('../Models/entrepriseModel')



module.exports={


    create : async (req , res) =>{
        try {
         const offre = new offreModel({...req.body})
         await offre.save(req.body , (err , item)=>{
             if (err) {
                 res.status(400).json({ success:false, message:"failed to Get all candidat", err})
              }else{
                  res.status(200).json({success:true,message:"success to Get all candidat ",data:item })
              }
         })
        } catch (error) {
         res.status(500).json({ success:false, message:"failed to Get all candidat", error})
     
        }
     
     },
     getAll:async (req, res)=>{
        try {
            const listoffre = await offreModel.find({}).populate("entreprise")
      
            res.status(200).json({
              message: "list of offres",
              data: listoffre,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: error,
              error,
            });
          }
        },
        delete : async (req , res )=>{
            try {
                await  offreModel.findByIdAndDelete(req.params.id).exec((err)=>{
                      if (err){
                          res.status(400).json({success:false , message:"failed to delete" , err})
                      } else {
                          res.status(200).json({success:true , message:"delete succufully" })
                      }
                  })
              } catch (error) {
                  res.status(500).json({success:false, message:"error" , error})
              }
            
        },
        update:async (req , res)=>{
            try {
             await  offreModel.findByIdAndUpdate(req.params.id , req.body, {new : true}).exec((err, item)=>{
                    if (err){
                        res.status(400).json({success:false , message:"Failed to update" , err})
                    }else {
                        res.status(200).json({success:true , message:"upadte succefully" , data:item})
                    }
                })
            } catch (error) {
                res.status(500).json({success:false , message:"Failed to update" , err})
        
            }
        },
        getById:async (req , res)=>{
            try {
                await offreModel.findById(req.params.id).exec((err , item)=>{
                    if (err){
                        res.status(400).json({success:false , message:"Getting Comment by id failed " , err})
                    } else {
                        res.status(200).json({success:true, message:"Getting comment succufuly" , data:item})
                    }
                })
            } catch (error) {
                res.status(500).json({success:false , message:"Getting Comment by id failed " , error})
        
            }
        },
        getByEntreprise:  async (req , res)=>{
           
            const offres= await offreModel.findById(entreprise = req.query.entreprise)
                    res.status(201)
                    .json({
                        succes:true,
                        message:'filter  offres by entreprise',
                        data:offres
                    })
                },
                getByEntreprise : async (req , res)=>{
                    try {
                        
                        const offres = await offreModel.find({ 
                            entreprise : req.query.entreprise,
                    })
                   
                
                    res.status(200)
                    .json({message:"liste offres" , data: offres})
                
                
                
                    } catch (error) {
                      res.status(406).json({message:"error"})  
                     
                
                    }
                }          


}