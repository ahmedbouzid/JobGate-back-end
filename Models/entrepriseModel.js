const mongoose = require('mongoose')
const  userModel=require('./UserModel')
const entrepriseSchema = mongoose.Schema({

    name:{type:String, required:true},
    phone:{type:Number,required:true},
    description:{type:String,required:true},
    siteWeb :{type:String , require:true},
    adress:{type:String,  required:true},
    categorie: {
        type: mongoose.Schema.ObjectId,
        ref: 'categorie',
        required: true
      },
      offre:[ {type:mongoose.Schema.Types.ObjectId,
        ref:'offre'}],
        State:{type:Boolean , default:false}

})
const Entreprise=userModel.discriminator('entreprise' , entrepriseSchema)
module.exports = mongoose.model('entreprise' ) 