const express = require('express')
const router = express.Router()
const { registerUser, relayRegisterUser } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/from-frontend', relayRegisterUser)

module.exports = router