require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/tasks', require('./routes/taskRoutes'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})