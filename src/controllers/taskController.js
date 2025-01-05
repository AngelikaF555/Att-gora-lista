const axios = require('axios')
const bodyParser = require('body-parser')
const Task = require('../models/Task')
const { getUpdatedData } = require('./formController')

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

const API_URL = 'http://localhost:5001/api/tasks/'

const btnToGetTask = async (req, res) => {
    const searchId = req.body.id
    try {
      const response = await axios.get(API_URL + searchId)
      const result = response.data
      res.json(result)
    } catch (error) {
      res.json(error)
    }
}

const btnToDeleteTask = async (req, res) => {
    const searchId = req.body.id
    try {
      const response = await axios.delete(API_URL + searchId)
      const result = response.data
      res.send(result)
    } catch (error) {
      res.send(error)
    }
  }

const btnToCreateTask = async (req, res) => {
   const title = req.body.title
   const status = req.body.status
   const estimatedTime = req.body.estimatedTime
   const category = req.body.category
   const priority = req.body.priority

   try {
    const respons = await axios.post(API_URL, {
        title: title,
        status: status,
        estimatedTime: estimatedTime,
        category: category,
        priority: priority,
    }, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    const result = respons.data
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

const btnToPUTTask = async (req, res) => {
    const searchId = req.body.id
    const title = req.body.title
    const status = req.body.status
    const estimatedTime = req.body.estimatedTime
    const category = req.body.category
    const priority = req.body.priority

    try {
        const respons = await axios.post(API_URL + searchId, {
            title: title,
            status: status,
            estimatedTime: estimatedTime,
            category: category,
            priority: priority,
        }, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const result = respons.data
        res.json(result)
      } catch (error) {
        res.json(error)
      }
}

const btnToPATCHTask = async (req, res) => {
  const updatedData = getUpdatedData(req.body)

  try {
    console.log('ID som skickas:', req.body.id)
    console.log('Data som skickas:', updatedData)

    const response = await axios.patch(`${API_URL}${req.body.id}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    res.status(200).json({ message: 'Resurs uppdaterad', result: response.data })
  } catch (error) {
    console.error('Ett fel uppstod:', error.message)

    if (error.response) {
      res.status(error.response.status).json({
        message: 'Ett fel från servern uppstod',
        error: error.response.data,
      })
    } else {
      res.status(500).json({ message: 'Ett serverfel uppstod', error: error.message })
    }
  }
}

module.exports = { createTask, updateTask, getTask, deleteTask, btnToGetTask, btnToCreateTask, btnToDeleteTask, btnToPUTTask, btnToPATCHTask }