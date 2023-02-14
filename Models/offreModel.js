const mongoose =require('mongoose')


const offreSchema = mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String, required:true},
    entreprise:{
        type: mongoose.Schema.ObjectId,
        ref: 'entreprise',
        required: true
    },
    candidature:[ {type:mongoose.Schema.Types.ObjectId,
        ref:'candidature'}],
})
 module.exports=mongoose.model('offre' , offreSchema)