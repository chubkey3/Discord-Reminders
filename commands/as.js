const User = require('../models/User.js');

async function as(message, task_names){  
    let a = message.content.split(' ');

    if (a.length !== 2){
        message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

    } else {
        if (task_names.includes(a[1])){
            message.channel.send('Task Already Exists!')

        } else {
            await User.updateOne({id: message.author.id}, {$push: {tasks: {title: a[1], time: null}}})
            message.channel.send('Task Added!')
        }
    }
}

module.exports = as