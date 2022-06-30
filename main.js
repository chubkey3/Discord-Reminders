const {Client} = require('discord.js');

require('dotenv').config()

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'],
  partials: ['CHANNEL']
});

const tasks = {"336256772165599253": {"breakfast": "3:00pm", "lunch": "6:00pm"}, "878158135544651827": {"dinner": "10:00pm"}}

client.once('ready', () => console.log('Ready!'));

client.on('messageCreate', (message) => {
    
    if (message.channel.type  && !message.author.bot ){ //message.channel.type === "DM"

        let id = message.author.id

        if (message.content.startsWith('!a ')) {

            let a = message.content.split(' ');

            if (a.length !== 3){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (a[1] in tasks[id]){
                    message.channel.send('Task Already Exists!')

                } else {
                    tasks[id][a[1]] = a[2]
                    message.channel.send('Task Added!')
                }
            }
        }
        else if (message.content.startsWith('!d ')) {

            let a = message.content.split(' ');

            if (a.length !== 2){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (tasks[id][a[1]]){
                    delete tasks[a[1]]
                    message.channel.send('Task Removed!')
                } else {
                    message.channel.send('Task Does Not Exist!')
                }   
            }
        }
        
        else if (message.content.startsWith('!l')) {

            if (Object.keys(tasks[id]).length === 0){
                message.channel.send('You have no tasks right now.')

            } else {
                message.channel.send('Tasks:')

                for (var task in tasks[id]){
                    message.channel.send(`${task} @ ${tasks[id][task]}`)
                } 
            }
            
        } else if (message.content.startsWith('!h')) {
            message.channel.send('Commands:\n!a <task> <time> | Add a new task add a certain time\n!d <task> | Delete a task\n!l | List all current tasks\n!h | View command list')

        } else {
            message.channel.send(`${message.content} is not a proper command. Message !h for help with commands.`)
        }

    }
});

client.login(process.env.TOKEN)