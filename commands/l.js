async function l(message, tasks){  
    if (Object.keys(tasks).length === 0){
        message.channel.send('You have no tasks right now.')

    } else {
        message.channel.send(`Tasks(${Object.keys(tasks).length}):`)

        for (var task in tasks){
            if (tasks[task]['time'] !== null){
                message.channel.send(`${tasks[task]['title']} @ ${new Date(tasks[task]['time']).toLocaleTimeString()}`)
            } else {
                message.channel.send(`${tasks[task]['title']}`)
            }
            
        } 
    }
}

module.exports = l