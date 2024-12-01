const express = require('express')
const router = express.Router()
const { 
    createTask, getAllTasks, getTask, updateTask, deleteTask, btnToGetTask, 
    btnToCreateTask,
    btnToDeleteTask,
    btnToUpdateTask
} = require('../controllers/taskController')

router.post('/', createTask)

router.get('/', getAllTasks)

router.get('/:task_id', getTask)

router.put('/:task_id', updateTask)

router.delete('/:task_id', deleteTask)

router.post('/get-task', btnToGetTask)

router.post('/delete-task', btnToDeleteTask)

router.post('/create-task', btnToCreateTask)

router.post('/update-task', btnToUpdateTask)

module.exports = router