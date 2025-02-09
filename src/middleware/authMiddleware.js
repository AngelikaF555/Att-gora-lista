const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.accessToken
  console.log(token)
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' })
  }

  try {
    req.user = jwt.verify(token, process.env.ACCESS_SECRET)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
  
module.exports = requireAuth