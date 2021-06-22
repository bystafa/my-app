const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const passport = require('passport')
const upload = require('../middleware/load')

router.post('/create', passport.authenticate('jwt',{session: false}), upload.single('imageSrc'), controller.create)
router.post('/', controller.getAllByCategory)
router.get('/', controller.getAll)
router.post('/getByString', controller.getByString)
router.get('/:id', controller.getById)
router.post('/:id', controller.changeRating)
router.patch('/:id', passport.authenticate('jwt',{session: false}), upload.single('imageSrc'), controller.change)
router.delete('/:id', passport.authenticate('jwt',{session: false}), controller.delete)

module.exports = router