const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    status: { type: String, default: 'not done'}, //default funkar när jag skickar från postman men inte från webben
    estimatedTime: { type: String },
    category: { type: String },
    priority: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Task', TaskSchema)

