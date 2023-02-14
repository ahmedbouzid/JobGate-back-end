const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv').config()
const {join}=require('path')
const { networkInterfaces } = require('os')
// token and refrech keys
const JWT_SECRET = "secretKey"
const RF_JWT_TOKEN = "azerty"
//table refrech token
let refrechTokens = []
//token creation 
const genrateAccessToken=(user)=>{
return jwt.sign({id : user.id}, JWT_SECRET,{expiresIn:"30m"})
}
//refrech token creation
const generateRefrechToken =(user)=>{
    return jwt.sign({id : user.id},RF_JWT_TOKEN ,{expiresIn:"1h"})
}

module.exports={
    login:async (req, res)=>{
        try {
            const user = await User.findOne({email:req.body.email})
            if (!user){
             res.status(400).json({succes:false , message:"email not valid"}) 

            }else {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                )
                if (!validPassword){
                res.status(400).json({succes:false , message:'invalid Password'})
                }else {
                    const accesToken = genrateAccessToken(user)
                    const RToken = generateRefrechToken(user)
                    res.status(200)
                    .json({
                        succes:true , message:"login succufully",
                        data:{data:user , token :accesToken , RefrechToken:RToken},
                    })
                }
            }
        } catch (error) {
            res.status(500).json({success:false ,message:"error",message:error.message});
        }


    },
    verifyEmail : async (req , res)=>{
        try {
            const {verificationCode}=req.params
            const users=await User.findOne({
              verificationCode,
            });
            users.verify=true
            users.verificationCode=undefined
            users.save()
            return res.sendFile(join(__dirname, "../templates/succes.html"))
            
            } catch (error) {
              return res.sendFile(join(__dirname, "../templates/errors.html"))
            }
    },
    logout: async (req, res) => {

        const refreshToken = req.body.token
        refrechTokens = refrechTokens.filter(() => token !== refreshToken)
        res.status(200).json("You logged out Succufully")
    },
    verifyRefrechToken: (req, res) => {
        const RefreshToken = req.body.token
        if (!refrechTokens.includes(RefreshToken))
          return res.status(403).json('refrech token is not valid')
    
        jwt.verify(RefreshToken, refrech_token_secret, (err, user) => {
            refrechTokens = refrechTokens.filter((token) => token !== RefreshToken)
          const newAcessToken = genrateAccessToken(RefreshToken)
          const newRefrechToken = generate(RefreshToken)
          refrechTokens.push(newRefrechToken)
          res.status(200)
            .json({ token: newAcessToken, refreshToken: newRefrechToken })
        })
    
      },
    profil : async(req , res)=>{
        try {
          const user = req.user
          res
          .status(200)
          .json({user : user , message:"success"})
        } catch (error) {
          res
          .status(400)
          .json({user: error , message:"error"})
          
        }
      }
      
}
