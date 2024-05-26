// File: dashboard.js

// Import necessary packages and modules
const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('../config/settings.json');

// Create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Read all command files and add them to the client.commands Collection
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Set up event listener for when the bot is ready
client.once('ready', () => {
    console.log('Dashboard is ready!');
});

// Set up event listener for when a message is sent
client.on('message', message => {
    // Ignore messages that don't start with the prefix or are sent by bots
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Separate the command and arguments from the message content
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Get the command object from the client.commands Collection
    const command = client.commands.get(commandName);

    // If the command does not exist, exit early
    if (!command) return;

    // Try executing the command, catch any errors
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command!');
    }
});

// Login to Discord with bot token
client.login('your-bot-token-goes-here');