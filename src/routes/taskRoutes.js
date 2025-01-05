const express = require('express')
const router = express.Router()
const { 
    createTask,
    getTask,
    updateTask,
    deleteTask,
    btnToGetTask, 
    btnToCreateTask,
    btnToDeleteTask,
    btnToPUTTask,
    btnToPATCHTask
} = require('../controllers/taskController')

router.post('/', createTask)

router.get('/:task_id', getTask)

router.put('/:task_id', updateTask)

router.patch('/:task_id', updateTask)

router.delete('/:task_id', deleteTask)

router.post('/get-task', btnToGetTask)

router.post('/delete-task', btnToDeleteTask)

router.post('/create-task', btnToCreateTask)

router.post('/put-task', btnToPUTTask)

router.post('/patch-task', btnToPATCHTask)

module.exports = router