const Discord = require('discord.js');
module.exports = (client) => {
    client.on('message', message => {
        const {
            guild,
            channel,
            member,
            content
        } = message
        // If you want to check member is the moderator, you can add this code => `if(member.hasPermission('Permission...')){code}`

        // Control the prefix
        if (content.startsWith('&')) {
            // Check the member in the voice channel
            if (member.voice.channelID) {
                let text = content
                const split = text.split(' ')
                const textinga = split[0].substring(1, split[0].length).toLowerCase()
                // Check the command
                if (textinga === 'movemember') {
                    // Check if user not give the id
                    if (split.length < 2) {
                        message.reply('Please write a voice channel id!')
                    } else {
                        const chId = split[1]
                        // Check if user write the number or not a number
                        if (isNaN(chId)) {
                            message.reply('Voice channel id should be a number!')
                        } else {
                            // Get the channel which will users go
                            const goTo = guild.channels.cache.get(chId)
                            // Check if channel is a voice channel
                            if(goTo.type === 'voice'){
                                // Taking members on voice channel 
                                const voiceHere = guild.channels.cache.get(member.voice.channelID)
                                // Members
                                const chUsers = voiceHere.members
                                chUsers.forEach(m=>{
                                    const usergo = guild.members.cache.get(m.user.id)
                                    usergo.voice.setChannel(goTo)
                                })
                                message.reply('Users has been move the '+'`'+`${voiceHere.name}`+'`')
                            }else{
                                message.reply('This id is not a voice channel id!')
                            }
                        }
                    }
                }
            } else {
                message.reply('Please join the voice channel :(')
            }
        }
    })
}