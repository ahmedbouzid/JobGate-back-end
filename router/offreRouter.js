const router = require('express').Router()
const offreController = require('../Controllers/offreController')
const { off } = require('../Models/offreModel')

router.post('/create' , offreController.create)
router.get('/getAll' , offreController.getAll)
router.put('updateO/:id' , offreController.update)
router.delete('/delete/:id' , offreController.delete)
router.get('/getById/:id' , offreController.getById)
router.get('/getByEntreprise/:id' , offreController.getByEntreprise)
router.get('/getOByEntreprise/' , offreController.getByEntreprise)
module.exports = router