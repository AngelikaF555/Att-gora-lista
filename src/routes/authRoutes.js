const express = require('express')
const router = express.Router()
const { login, refresh, logout } = require('../controllers/authController')
const { registerUser, relayRegisterUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/register/from-frontend', relayRegisterUser)

router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)

module.exports = router