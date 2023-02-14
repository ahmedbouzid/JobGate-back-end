const candidatModel = require('../Models/candidatModel')
const commentaireModel = require('../Models/CommentaireModel')

module.exports ={
create : async (req , res) =>{
   try {
    const commentaire = new commentaireModel({...req.body})
    await commentaire.save(req.body , (err , item)=>{
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
getAll : async (req, res) => {
    try {
      const listCommentaire = await commentaireModel.find({})/* .populate("candidat") */
      res.status(200).json({
        message: "list of Commentaire",
        data: listCommentaire,
      });
    } catch (error) {
      res.status(400).json({
        msg: "error" + error.message,
      });
    }
  },
delete : async (req , res )=>{
    try {
        await  commentaireModel.findByIdAndDelete(req.params.id).exec((err)=>{
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
update: async (req , res)=>{
    try {
        await commentaireModel.findByIdAndUpdate(req.params.id , req.body , {new : true}).exec((err , item)=>{
            if (err){
                res.status(400).json({success:false , message:"You can't modify your comment" , err})
            }else{
                res.status(200).json({success:true, message:"mofication succufully" ,data:item})
            }
        })
    } catch (error) {
        res.status(500).json({success:false , message:"You can't modify your comment" , err})

    }
},
getById:async (req , res)=>{
    try {
        await commentaireModel.findById(req.params.id).exec((err , item)=>{
            if (err){
                res.status(400).json({success:false , message:"Getting Comment by id failed " , err})
            } else {
                res.status(200).json({success:true, message:"Getting comment succufuly" , data:item})
            }
        })
    } catch (error) {
        res.status(500).json({success:false , message:"Getting Comment by id failed " , error})

    }
}
}