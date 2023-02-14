const { truncate } = require('fs')
const jwt =require('jsonwebtoken')
const { mainModule } = require('process')
const JWT_SECRET = "secretKey"


check_auth= async (req , res , next )=>{
    try {
        const token = req.headers['authorisation']
        if (!token){
            return res.status(400).json({message:"No Token"})
        }
        jwt.verify(token , JWT_SECRET,(err , decoder)=>{
            if (err){
                return res.status(500).json({message:"Authentification Failed"})
            }
            req.user = decoder;
            next()
        })
    } catch (error) {
        return res.status(500).json({message:"Authentification Failed" })
 
    }
}
module.exports=check_auth