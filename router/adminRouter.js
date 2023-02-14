const router =require('express').Router()
const adminController =  require('../Controllers/adminController')
const entrepriseController = require('../Controllers/entrepriseController')
const candidatController=require('../Controllers/candidatController')


router.post('/registre' , adminController.registre)
router.get('/allEntreprise' , entrepriseController.getAll)
router.delete('/deleteEntreprise/:id' , entrepriseController.delete)
router.get('/entrepriseById/:id' , entrepriseController.getById)
router.get('/entrepriseByname/' , entrepriseController.getByName)
router.get('/AllCandidat' , candidatController.getAll)
router.get('/candidatByName' , candidatController.getByName)
router.delete('/deleteCandidat/:id' , candidatController.delete)
router.get('/GetCandidatById/:id' , candidatController.getById )
router.get('/validateEntre/:id' , adminController.ValiderEntrprise)



module.exports =  router