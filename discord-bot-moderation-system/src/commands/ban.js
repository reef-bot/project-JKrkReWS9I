// File: ban.js

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();
const PREFIX = process.env.PREFIX;

client.once('ready', () => {
  console.log('Bot is ready');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(`${PREFIX}ban`)) {
    const member = message.mentions.members.first();
    
    if (member) {
      try {
        await member.ban();
        message.channel.send(`${member} has been banned.`);
      } catch (error) {
        console.error(error);
        message.channel.send('There was an error trying to ban the member.');
      }
    } else {
      message.channel.send('You need to mention the member you want to ban.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);