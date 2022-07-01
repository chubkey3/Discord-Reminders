const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
    }
})

module.exports = TaskSchema