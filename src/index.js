const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())

app.use('/api/tasks', require('./routes/taskRoutes'))

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})