const Task = require('../models/Task')

const createTask = async (req, res) => {
    const { title, status, estimatedTime, category, priority } = req.body
    
    try {
        const newTask = new Task({ title, status, estimatedTime, category, priority })
        const task = await newTask.save()
        res.status(201).json(task)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
}

const getTask = async (req, res) => {
    const { task_id } = req.params
    try {
      const task = await Task.findById(task_id)
      if (!task) {
        return res.status(404).json({ message: 'Task not found' })
      }
      res.status(200).json(task)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }

const updateTask = async (req, res) => {
    const { task_id } = req.params
    const { title, status, estimatedTime, category, priority } = req.body
  
    console.log("Incoming task_id:", task_id)
    console.log("Incoming body:", { title, status, estimatedTime, category, priority })

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        task_id, 
        { title, status, estimatedTime, category, priority },
        { new: true }
    )
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' })
      }
      res.status(200).json(updatedTask)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }

const deleteTask = async (req, res) => {
const { task_id } = req.params

try {
    const deletedTask = await Task.findByIdAndDelete(task_id)
    if (!deletedTask) {
    return res.status(404).json({ message: 'Task not found' })
    }
    res.status(200).json(deletedTask)
} catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
}
}

module.exports = { createTask, getAllTasks, updateTask, getTask, deleteTask }