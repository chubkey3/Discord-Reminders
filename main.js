const {Client} = require('discord.js');
const mongoose = require('mongoose');
const User = require('./models/User.js')
const {a, am, as, d, h, l, tz} = require('./commands');

require('dotenv').config()

const jobs = []

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'],
  partials: ['CHANNEL']
});

client.once('ready', async () => {console.log('Ready!'); mongoose.connect(process.env.MONGODB).then(() => console.log('Connected to MongoDB.'))});

client.on('messageCreate', async (message) => {

    if (!message.author.bot){

        if (message.channel.type !== "DM"){
            message.channel.send('Please message me in DMs or remove me from this server.')
        } else {
            let tasks = (await User.findOne({id: message.author.id}))

            if (!tasks){
                let user = new User({
                    id: message.author.id
                })
                await user.save()

            } else {
                tasks = tasks['tasks']
            }


            let task_names = [];
            
            for (t in tasks){
                task_names.push(tasks[t]['title'])
            }


            if (message.content.startsWith('!a ')) {
                a(message, jobs, task_names);
            }
            
            else if (message.content.startsWith('!as ')) {
                as(message, task_names);
            }

            else if (message.content.startsWith('!am ')) {
                am(message, jobs, task_names);
            }


            else if (message.content.startsWith('!d ')) {
                d(message, task_names) 
            }

            else if (message.content.startsWith('!l')) {
                l(message, tasks)
                
            } else if (message.content.startsWith('!tz ')){
                tz(message)

            } else if (message.content.startsWith('!h')) {
                h(message)

            } else {
                message.channel.send(`${message.content} is not a proper command. Message !h for help with commands.`)
            }
        }
    }
});


client.login(process.env.TOKEN)