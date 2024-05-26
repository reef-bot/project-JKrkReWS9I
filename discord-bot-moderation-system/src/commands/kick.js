// kick.js

const { Client, Message } = require('discord.js');

/**
 * Execute the kick command to kick a user from the server.
 * @param {Client} client - The Discord client.
 * @param {Message} message - The message that triggered the command.
 * @param {String[]} args - The command arguments.
 */
const execute = async (client, message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    if (!user) {
        return message.reply('Please mention the user you want to kick.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
        return message.reply('That user is not in this server.');
    }

    if (!member.kickable) {
        return message.reply('I cannot kick that user.');
    }

    try {
        await member.kick();
        message.channel.send(`${user.tag} has been kicked.`);
    } catch (error) {
        console.error(`Error kicking user: ${error}`);
        message.reply('There was an error kicking that user.');
    }
};

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    execute,
};