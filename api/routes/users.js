const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.delete('/:emailId', userController.delete_user)

router.get('/all', userController.get_all_users)

module.exports = router