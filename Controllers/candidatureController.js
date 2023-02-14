const candidatureModel =require('../Models/candidatureModel')

module.exports = {

    create : async (req , res)=>{
        console.log(req);
        try {
            req.body["cv"]=!req.file ? null  :req.file.filename
          const candidature = new candidatureModel(req.body)
          await candidature.save(req.body,(err , item)=>{
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

    }
    catch (error){
        res.status(500)
        .json({message:"error" , error})
    }
},
getAll : async (req, res) => {
    try {
      const listcandidature = await candidatureModel.find({}).populate("offre").populate( "candidat")
      res.status(200).json({
        message: "list of candidatature",
        data: listcandidature,
      });
    } catch (error) {
      res.status(400).json({
        msg: "error" + error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      await candidatureModel
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec((err, item) => {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "Failed to update", err });
          } else {
            res
              .status(200)
              .json({
                success: true,
                message: "upadte succefully",
                data: item,
              });
          }
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to update", err });
    }
  },
  delete: async (req, res) => {
    try {
      await candidatureModel.findByIdAndDelete(req.params.id).exec((err) => {
        if (err) {
          res
            .status(400)
            .json({ success: false, message: "failed to delete", err });
        } else {
          res.status(200).json({ success: true, message: "delete succufully" });
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "error", error });
    }
  },
  getById: async (req, res) => {
    try {
      await candidatureModel.findById(req.params.id).exec((err, item) => {
        if (err) {
          res.status(400).json({ success: false, message: "failed", err });
        } else {
          res
            .status(200)
            .json({ success: true, message: "success", data: item });
        }
      });
    } catch (error) {
      res.status(400).json({ success: false, message: "failed", err });
    }
  },

}