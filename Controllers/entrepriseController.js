const entrepriseModel = require('../Models/entrepriseModel')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const {randomBytes}=require("crypto");
const { rmSync } = require('fs');
const { ifError } = require('assert');
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c33de12665e6a4",
      pass: "daa90134f3b182",
    },
  });
const DOMAIN = process.env.DOMAIN
module.exports ={

    registre :async (req , res)=>{
        try {
           const salt = bcrypt.genSalt(10) 
           const hash = bcrypt.hashSync(req.body.password ,parseInt(salt))
           const entreprise = new entrepriseModel({
            ...req.body,
            password:hash,
            verificationCode:randomBytes(6).toString('hex')
           })
           await entreprise.save(req.body, (err, item)=>{
            if (err){
             res.status(400).json({success:false,message:"failed",err});
            }else{
               transport.sendMail({
                   form:"myname@gmail.com",
                   to:item.email,
                   subject:"Welcom " + item.name,
                   html:`<!DOCTYPE html>
                   <html lang="en">
                   <head>
                       <meta charset="UTF-8">
                       <meta http-equiv="X-UA-Compatible" content="IE=edge">
                       <meta name="viewport" content="width=device-width, initial-scale=1.0">
                       <title>Document</title>
                   </head>
                   <body>
                       <h1>bonjour ${item.name} </h1>
                       <h3>email ${item.email}</h3>
                  <a href="${DOMAIN}/auth/verify/${item.verificationCode}">Verify-now</a>
                   
                   </body>
                   </html>`,
               });
                res.status(201).json({success:true,message:"success",data:item})
            }
       })
        } catch (error) {
            res.status(400).json({ success:false, message:"failed "})
   
        }
    },
    getAll : async (req, res) => {
        try {
          const listentreprise = await entrepriseModel.find({}).populate("offre");
          res.status(200).json({
            message: "list of entreprise", 
            data: listentreprise,
          });
        } catch (error) {
          res.status(400).json({
            msg: "error" + error.message,
          });
        }
      },
    update:async (req , res)=>{
        try {
         await   entrepriseModel.findByIdAndUpdate(req.params.id , req.body, {new : true}).exec((err, item)=>{
                if (err){
                    res.status(400).json({success:false , message:"Failed to update" , err})
                }else {
                    res.status(200).json({success:true , message:"upadte succefully" , data:item})
                }
            })
        } catch (error) {
            res.status(500).json({success:false , message:"Failed to update" , err})

        }
    },
    delete : async (req , res)=>{
        try {
          await  entrepriseModel.findByIdAndDelete(req.params.id).exec((err)=>{
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
    getById:async(req,res)=>{
        try {
          await entrepriseModel.findById(req.params.id).exec((err,item)=>{
                if(err){
                 res.status(400).json({success:false,message:"failed",err})
                }else{
                  res.status(200).json({success:true,message:"success",data:item})
                }
          })
        } catch (error) {
          res.status(400).json({success:false,message:"failed",err})
        }
      },
    getByName : async (req , res)=>{
        try {
            await entrepriseModel.find({name:req.query.name}).exec((err, item)=>{
                if (err){
                    res.status(400).json({success:false, message:'failed to get name' , err})
                }else {
                    res.status(200).json({success:true,message:"getting by name succufully" , data:item})
                }
            })
        } catch (error) {
            res.status(500).json({success:false, message:'failed to get name' , err})

        }
    }

}