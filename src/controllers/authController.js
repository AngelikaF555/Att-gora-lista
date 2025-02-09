const User = require('../models/User')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { generateAccessToken, generateRefreshToken } = require('../utils/token')

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

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: process.env.ACCESS_TOKEN_AGE
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.sendFile(path.join(__dirname, '../../public/to-do-app.html'))

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' })

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' })

        const newAccessToken = generateAccessToken({ id: user.id, username: user.username })

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: process.env.ACCESS_TOKEN_AGE
        })

        res.json({ message: 'Access token refreshed' })
    })
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    res.cookie('accessToken', '', { httpOnly: true, expires: new Date(0) })
    res.cookie('refreshToken', '', { httpOnly: true, expires: new Date(0) })

    return res.json({ message: 'Logged out' })
}

module.exports = { login, refresh, logout }