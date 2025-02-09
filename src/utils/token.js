const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        process.env.ACCESS_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_AGE })
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        process.env.REFRESH_SECRET, 
        { expiresIn: '7d' })
}

module.exports = { generateAccessToken, generateRefreshToken }
