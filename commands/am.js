const schedule = require('node-schedule');
const User = require('../models/User.js');
const { getTimeZone } = require('../util.js');

async function am(message, jobs, task_names){  
    let a = message.content.split(' ');

    if (a.length !== 3){
        message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')

    } else {

        if (task_names.includes(a[1])){
            message.channel.send('Task Already Exists!')

        } else if(Number(a[2]) > 0) {   

            let timezone = await getTimeZone(message.author.id)
            
            let date = new Date( new Date().toLocaleString([], {timeZone: timezone}) )
            
            //initialized as Athens but set as Vancouver???
            date.setSeconds(date.getSeconds() + 60*Number(a[2]))
            console.log(date.toTimeString())
            //let date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()+Number(a[2]))
            
            jobs.push(schedule.scheduleJob(date, function(){
                message.channel.send(`<@${message.author.id}>`)
                message.channel.send(`Task: **${a[1]}**`)
            }))

            await User.updateOne({id: message.author.id}, {$push: {tasks: {title: a[1], time: date}}})
            message.channel.send('Task Added!')
            
        } else {
            message.channel.send('Please enter an integer greater than or equal to 1 minute')
        }
    }
}

module.exports = am