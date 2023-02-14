const mongoose =require('mongoose')

const categorieSchema = new mongoose.Schema({
    category:{type:String, required:true},
    description:{type:String},
    entreprise:[{type:mongoose.Schema.ObjectId,
        ref:'entreprise'}]
})
module.exports=mongoose.model('categorie', categorieSchema)