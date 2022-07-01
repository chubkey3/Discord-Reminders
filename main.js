const {Client} = require('discord.js');
const schedule = require('node-schedule');
const mongoose = require('mongoose');

function parseTime(t){
    if (t.endsWith('am')){
        return t.slice(0, -2)
    } else if (t.endsWith('pm')){
        let k = t.split(':')
        
        k[0] = String(Number(t[0])+12)
        
        
        k.join(':')
        
        return k.join(':').slice(0, -2);

    } else {
        return t
    }
}

const jobs = []

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

            if (a.length < 3 || a.length > 4){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (a[1] in tasks[id]){
                    message.channel.send('Task Already Exists!')

                } else {
                    tasks[id][a[1]] = a[2]
                    message.channel.send('Task Added!')
                    let date;
                    if (a.length === 3){
                        let today = new Date()
                        a[2] = parseTime(a[2])
                        console.log(a[2])
                        date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), a[2].split(':')[0], a[2].split(':')[1].replace('0', ''))
                        

                    } else {
                        date = new Date(a[3].split('/')[2], a[3].split('/')[0]-1, a[3].split('/')[1], a[2].split(':')[0], a[2].split(':')[1].replace('0', ''))

                    }
                   
                    jobs.push(schedule.scheduleJob(date, function(){
                        message.channel.send(`<@${message.author.id}>`)
                        message.channel.send(`Task: **${a[1]}**`)
                    }))
                    
                }
            }
        }
        
        else if (message.content.startsWith('!as ')) {

            let a = message.content.split(' ');

            if (a.length !== 2){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (a[1] in tasks[id]){
                    message.channel.send('Task Already Exists!')

                } else {
                    tasks[id][a[1]] = "None"
                    message.channel.send('Task Added!')
                }
            }
        }

        else if (message.content.startsWith('!am ')) {

            let a = message.content.split(' ');

            if (a.length !== 3){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (a[1] in tasks[id]){
                    message.channel.send('Task Already Exists!')

                } else if(Number(a[2]) > 0) {
                    tasks[id][a[1]] = 'None' //fix this
                    message.channel.send('Task Added!')
                    
                    let today = new Date()
                    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()+Number(a[2]))

                    jobs.push(schedule.scheduleJob(date, function(){
                        message.channel.send(`<@${message.author.id}>`)
                        message.channel.send(`Task: **${a[1]}**`)
                    }))
                    
                } else {
                    message.channel.send('Please enter an integer greater than or equal to 1 minute')
                }
            }
        }


        else if (message.content.startsWith('!d ')) {

            let a = message.content.split(' ');

            if (a.length !== 2){
                message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

            } else {

                if (tasks[id][a[1]]){
                    delete tasks[id][a[1]]
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
                message.channel.send(`Tasks(${Object.keys(tasks[id]).length}):`)

                for (var task in tasks[id]){
                    if (tasks[id][task] !== "None"){
                        message.channel.send(`${task} @ ${tasks[id][task]}`)
                    } else {
                        message.channel.send(`${task}`)
                    }
                    
                } 
            }
            
        } else if (message.content.startsWith('!h')) {
            message.channel.send('Commands:\n**!a** <task> <time> | Add a new task at a certain time\n**!as** <task> | Add a new task without a time\n**!am** <minutes> | Add a task in specified minutes\n**!d** <task> | Delete a task\n**!l** | List all current tasks\n**!h** | View command list')

        } else {
            message.channel.send(`${message.content} is not a proper command. Message !h for help with commands.`)
        }
    }
});


client.login(process.env.TOKEN)