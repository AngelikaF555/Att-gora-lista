const express = require('express')
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.post('/', taskController.createTask)
router.get('/', taskController.getTasks)
router.get('/:task_id', taskController.getTask)
router.put('/:task_id', taskController.updateTask)
router.patch('/:task_id', taskController.updateTask)
router.delete('/:task_id', taskController.deleteTask)

router.post('/get-task', taskController.btnToGetTask)
router.post('/delete-task', taskController.btnToDeleteTask)
router.post('/create-task', taskController.btnToCreateTask)
router.post('/put-task', taskController.btnToPUTTask)
router.post('/patch-task', taskController.btnToPATCHTask)

module.exports = router