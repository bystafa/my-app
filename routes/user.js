const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const passport = require('passport')

router.patch('/add', passport.authenticate('jwt',{session: false}), controller.addProduct)
router.patch('/delete', passport.authenticate('jwt',{session: false}), controller.deleteProduct)
router.get('/', passport.authenticate('jwt',{session: false}), controller.getInfo)
router.get('/deleteAll', passport.authenticate('jwt',{session: false}), controller.deleteAll)
router.patch('/like', passport.authenticate('jwt',{session: false}), controller.like)

module.exports = router