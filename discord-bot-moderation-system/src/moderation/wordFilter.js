// File: wordFilter.js

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // Implement word filtering logic here
    const bannedWords = ['badword1', 'badword2', 'badword3'];

    if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
        message.delete();
        message.reply('Please refrain from using inappropriate language.');
        // Log the action
        fs.appendFileSync('./src/logging/logs.txt', `User ${message.author.tag} used banned word in ${message.channel.name} at ${new Date().toISOString()}\n`);
    }
});

client.login('your-token-goes-here');

module.exports = client;