const express = require('express')
const requireAuth = require('../middleware/authMiddleware')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', requireAuth, (req, res) => {
  try {
    res.status(200).json({
      message: 'Welcome to the protected route',
      user: req.user
    })
  } catch (error) {
    console.error('Error in protected route:', error)
    res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    })
  }
})

router.get('/get-tasks', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)

  } catch (error) {
    console.error('Error in protected route:', error)
    res.status(500).json({ 
      error: 'Failed to fetch tasks from the database.'
    })
  }
})

module.exports = router