const User = require('../models/User')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username }).exec()
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        const isPasswordMatching = bcrypt.compareSync(password, user.password)
        if (!isPasswordMatching) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600 * 1000,
            sameSite: 'strict',
        })

        res.sendFile(path.join(__dirname, '../../public/to-do-app.html'))

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
    
  module.exports = { login }