const mongoose=require("mongoose")
const userModel=require("./UserModel")
const candidatSchema =new mongoose.Schema({
    firstname:{type:String , required:true},
    lastname:{type:String,required:true},
    phone:{type:Number, required:true},
    image:{type:String , required:true},
    dataNaissance :{type:Date},
    cv:{type:String },
    commentaire: [ {type:mongoose.Schema.Types.ObjectId,
        ref:'commentaire'}], 
        candidature:[ {type:mongoose.Schema.Types.ObjectId,
            ref:'candidature'}],
    State:{type:Boolean , default:false}
})
const Candidat=userModel.discriminator("candidat",candidatSchema)
module.exports=mongoose.model("candidat")