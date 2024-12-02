const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }
  
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
  
      res.status(200).json({token})

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
  module.exports = { login }

  /*
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGUwYzliN2Y0N2Q1NTIzZDgwNWQwOCIsInVzZXJuYW1lIjoiQW5nZWxpa2EiLCJpYXQiOjE3MzMxNjk2OTEsImV4cCI6MTczMzE3MzI5MX0.ExCDlRTWJZl01rjUr_l7zRp_jB4WoK0xNwhmWBWYKxQ"
}
    */