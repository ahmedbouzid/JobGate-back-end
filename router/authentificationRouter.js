const router=require("express").Router()
const authController = require('../Controllers/authentification')
const verify=require ('../Middelware/verify')

router.post('/login' , authController.login)
router.get('/verify/:verificationCode' , authController.verifyEmail)

router.post('/logout' ,verify, authController.logout)
router.post('/refrechToken' , authController.verifyRefrechToken)
router.post('/profil' , verify, authController.profil)

module.exports=router