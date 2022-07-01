async function h(message){  
    message.channel.send('Commands:\n**!a** <task> <time> | Add a new task at a certain time\n**!as** <task> | Add a new task without a time\n**!am** <minutes> | Add a task in specified minutes\n**!d** <task> | Delete a task\n**!l** | List all current tasks\n**!h** | View command list')
}

module.exports = h