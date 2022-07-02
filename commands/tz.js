const { MessageEmbed } = require("discord.js")
const User = require('../models/User.js');
const {timezones} = require('../util');

async function tz(message){  
    
    let a = message.content.split(' ');

    let link = 'https://gist.githubusercontent.com/aviflax/a4093965be1cd008f172/raw/e2e93b35b85a0f78f1236c42f9d8c548d2d7000b/IANA%2520Time%2520Zone%2520Names.go'

    const embed = new MessageEmbed()
        .setTitle('View All Timezones')
        .setURL(link)        

    if (a.length === 2){
        if (a[1] === 'get'){
            let timezone = await User.findOne({id: message.author.id})

            message.channel.send(timezone['timezone'])
        } else if (a[1] == '1'){
            await User.updateOne({id: message.author.id}, {timezone: 'America/Vancouver'})
        } else if (a[1] == '2'){
            await User.updateOne({id: message.author.id}, {timezone: 'Europe/Athens'})
        }
        else if (!(a[1] in timezones)){
            message.channel.send('Please provide an official time zone.')
            message.channel.send({embeds: [embed]})
        } else {

            await User.updateOne({id: message.author.id}, {timezone: a[1]})

            message.channel.send('Updated timezone!')
        }

    } else {
        message.channel.send('Please use the proper format for this command\nIf you need help, message !h to get the list of commands')


        
    }
    
    
}

module.exports = tz