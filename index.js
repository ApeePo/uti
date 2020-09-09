const Discord = require('discord.js');
const bot = new Discord.Client();

const fs = require('fs')

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

const PREFIX = '-';

bot.once('ready', () => {
    console.log('Loading Content (1/348) .... Utilities 1.0 Is Online');
    bot.user.setActivity('Tanti server ', { type: "WATCHING"})
             .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
})

bot.on('message', message=>{

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (command === 'twitch') {
        bot.commands.get('twitch').execute(message, args);
    }

    if (command === 'linktree') {
        bot.commands.get('linktree').execute(message, args);
    }

    if (command === 'ban') {
        bot.commands.get('ban').execute(message, args);
    }

    if (command === 'kick') {
        bot.commands.get('kick').execute(message, args);
    }

})

bot.login("NzUyMjQxMjc4NzkxNzEyOTI4.X1UxSA.4OGXHLE108NPRhG9qRQdR9lk4Os");