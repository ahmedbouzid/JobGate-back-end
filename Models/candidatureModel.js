const mongoose = require("mongoose")
const candidatureSchema = new mongoose.Schema({
    lettreDeMotivation:{type:String},
    cv:{type:String},
    offre:[{type:mongoose.Schema.ObjectId,
        ref:'offre'}],
        candidat:{
            type: mongoose.Schema.ObjectId,
            ref: 'candidat',
            required: true
        }
})
module.exports=mongoose.model('candidature' , candidatureSchema)