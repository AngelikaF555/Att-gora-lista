const User = require('../models/User')
const axios = require('axios')

const registerUser = async (req, res) => {
    const { username, password } = req.body
  
    try {
      const newUser = new User({ username, password })
      const user = await newUser.save()
      res.status(201).json(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
  
  const relayRegisterUser = async (req, res) => {
    const API_URL = 'http://localhost:5001/api/users'
    const { username, password } = req.body

    try {
        const response = await axios.post(
            API_URL,
            { username, password },
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
        res.json(response.data)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Failed to relay user registration', error: error.message })
    }
}

  module.exports = { registerUser, relayRegisterUser }