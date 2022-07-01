const mongoose = require('mongoose');
const TaskSchema = require('./Task');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    tasks: [TaskSchema]
     

})

module.exports = mongoose.model('discord_users', UserSchema);