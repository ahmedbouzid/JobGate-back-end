const router=require("express").Router()
const uploadFiles = require('../Middelware/uploadFile')
const candidatureController = require('../Controllers/candidatureController')
router.post('/create' , uploadFiles.single('cv'), candidatureController.create)
router.get('/getAll' , candidatureController.getAll)
router.put('/update/:id' , candidatureController.update)
router.delete('/delete/:id' , candidatureController.delete)
router.get('/getBy/:id' , candidatureController.getById )

module.exports=router