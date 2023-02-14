const mongoose=require("mongoose")
const baseoption={
    discriminatorkey:"itemKey",
    collection:"users"

}

const SchemaUser=new mongoose.Schema(
    {
       
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password:{
        type:String,
        required:true
    
},
verificationCode:{
    type:String,
    require:true
},
verify:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
   

},baseoption,{timestamps:true})
module.exports=mongoose.model("user",SchemaUser)