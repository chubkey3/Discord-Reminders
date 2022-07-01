const schedule = require('node-schedule');
const User = require('../models/User.js');
const parseTime = require('../util');

async function a(message, jobs, task_names){  
    let a = message.content.split(' ');

    if (a.length < 3 || a.length > 4){
        message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

    } else {

        if (task_names.includes(a[1])){
            message.channel.send('Task Already Exists!')

        } else {

            let date;

            if (a.length === 3){
                let today = new Date()
                a[2] = parseTime(a[2])
                date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), a[2].split(':')[0], a[2].split(':')[1].replace('0', ''))
                

            } else {
                date = new Date(a[3].split('/')[2], a[3].split('/')[0]-1, a[3].split('/')[1], a[2].split(':')[0], a[2].split(':')[1].replace('0', ''))

            }
            
            jobs.push(schedule.scheduleJob(date, function(){
                message.channel.send(`<@${message.author.id}>`)
                message.channel.send(`Task: **${a[1]}**`)
            }))

            await User.updateOne({id: message.author.id}, {$push: {tasks: {title: a[1], time: date}}})
            message.channel.send('Task Added!')
        }
    }
}

module.exports = a;