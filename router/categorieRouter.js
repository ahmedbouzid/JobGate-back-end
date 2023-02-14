const router = require('express').Router()
const categorieController = require('../Controllers/categorieController')


router.post('/create' , categorieController.create)
router.get('/getAll' , categorieController.getAll)
router.put('/update/:id' , categorieController.update)
router.delete('/delete/:id' , categorieController.delete)
router.get('/get/:id' , categorieController.getById)
module.exports = router