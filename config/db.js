const mongoose=require("mongoose")
const dotenv= require('dotenv').config()
const DB_URL=process.env.DB_URL

    const {success,error}=require("consola")
const DateBase=mongoose.connect(DB_URL,(err)=>{
    if(err){
        error({message:"unable to connect with databse",badge:true})
    }else {
        success({message:"welcome to database",badge:true,});
    }
}
);