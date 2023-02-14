const multer = require('multer')
const candidatController = require('../Controllers/candidatController')
const commentaireController = require('../Controllers/commentaireController')

const router=require("express").Router()
const uploadFiles = require('../Middelware/uploadFile')


router.post('/registre'
,uploadFiles.fields([
    {name:"cv" , maxCount:1},
    {name:"image" , maxCount:1}
])
 ,candidatController.registre)
router.get('/getall' ,candidatController.getAll)
router.get('/get/:id' ,candidatController.getById)
router.put('/update/:id' , candidatController.update)
router.delete('/delete/:id' , candidatController.delete)
router.post('/commentaire' , commentaireController.create)
router.get('/allcommentaire' , commentaireController.getAll)
router.delete('/deleteComm/:id' , commentaireController.delete)
router.put('/updateComment/:id' , commentaireController.update)
router.get('/commentId/:id' , commentaireController.getById)
module.exports =router