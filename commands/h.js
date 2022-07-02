async function h(message){  
    message.channel.send('Commands:\n**!a** <task> <time> | Add a new task at a certain time\n**!as** <task> | Add a new task without a time\n**!am** <minutes> | Add a task in specified minutes\n**!d** [tasks] | Delete a task\n**!l** | List all current tasks\n**!tz GET** | Get timezone\n**!tz** <timezone> | Set timezone\n**!h** | View command list')
}

module.exports = h