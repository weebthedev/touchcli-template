module.exports ={
    name: `ping`,
    description: `Replies with pong!`,
    usage: ``,
    async execute(message, args, client) {
        console.log(message)
        await message.createMessage({ 
            content: 'pong!'
         })
        
    }

}
