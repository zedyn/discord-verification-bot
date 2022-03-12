const { Client, MessageEmbed } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGES'] })

client.once('ready', () => {
    console.log('Developed by zédyN.')
    console.log('Bot is ready!');

    const webserver = require('./webserver');
    webserver.load(client);
})

client.login(process.env.BOT_TOKEN)