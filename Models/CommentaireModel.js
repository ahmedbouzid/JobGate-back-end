const mongoose = require('mongoose')

const commentaireSchema = mongoose.Schema({
    description:{ type:String },
    candidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidat',
        required: true
      }
})
module.exports=mongoose.model('commentaire' , commentaireSchema)