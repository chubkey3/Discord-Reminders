const mongoose = require('mongoose');
const TaskSchema = require('./Task');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    tasks: [TaskSchema],
    timezone: {
        type: String,
        default: 'America/Vancouver'
    }
     

})

module.exports = mongoose.model('discord_users', UserSchema);