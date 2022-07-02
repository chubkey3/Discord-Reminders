const {getTimeZone} = require('../util');

async function l(message, tasks){  
    if (Object.keys(tasks).length === 0){
        message.channel.send('You have no tasks right now.')

    } else {

        let timezone = await getTimeZone(message.author.id)

        message.channel.send(`Tasks(${Object.keys(tasks).length}):`)

        let msg = "\n\n"

        for (var task in tasks){
            if (tasks[task]['time'] !== null){
                msg = msg + `${tasks[task]['title']} @ ${new Date(tasks[task]['time']).toLocaleString([], {timeZone: timezone}).split(', ')[1]}` + '\n\n'

            } else {
                msg = msg + `${tasks[task]['title']}` + '\n\n'
            } 
        }

        message.channel.send(msg)
    }
}

module.exports = l