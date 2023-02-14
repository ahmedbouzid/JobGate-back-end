const router = require('express').Router()
const entrepriseController = require('../Controllers/entrepriseController')
const offreController =require('../Controllers/offreController')


router.post('/registre' , entrepriseController.registre)
router.post('/offre' , offreController.create)

router.put('/update/:id' , entrepriseController.update)
router.put('/offreupdate/:id' , offreController.update)
router.delete('/delete/:id' , entrepriseController.delete)
router.delete('/deleteOffre/:id' , offreController.delete)
router.get('/get/:id' , entrepriseController.getById)
router.get('/getOffre/:id' , offreController.getById)
router.get('/getAllO' , offreController.getAll)

module.exports = router
