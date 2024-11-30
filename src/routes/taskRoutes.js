const express = require('express')
const router = express.Router()
const { createTask, getAllTasks, getTask, updateTask } = require('../controllers/taskController')

router.post('/', createTask)

router.get('/', getAllTasks)

router.get('/:task_id', getTask)

router.put('/:task_id', updateTask)

module.exports = router