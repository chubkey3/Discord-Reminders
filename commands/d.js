const User = require('../models/User.js');

async function d(message, task_names){  
    let a = message.content.split(' ');

    if (a.length < 2){
        message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

    } else {
        for (let i = 1; i<a.length; i++){
            if (task_names.includes(a[i])){
                await User.updateOne({id: message.author.id}, {$pull: {tasks: {title: a[i]}}})
                message.channel.send('Task Removed!')
    
            } else {
                message.channel.send('Task Does Not Exist!')
            }                              
        }
          
    }
}

module.exports = d