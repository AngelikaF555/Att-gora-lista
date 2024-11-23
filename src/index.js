const express = require('express')

const app = express()
const PORT = 5001

app.listen(PORT, () => {
    console.log('server listening on port: ${PORT}')
})