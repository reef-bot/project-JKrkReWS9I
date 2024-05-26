// File: warn.js

const { Client, Message } = require('discord.js');
const { createLogger, transports, format } = require('winston');
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'src/logging/logs.txt' })
  ]
});

/**
 * Warn a user in the server.
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {String[]} args - The command arguments
 */
const warn = (client, message, args) => {
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    return message.reply('You do not have permission to warn members.');
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply('Please mention a user to warn.');
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  const warnEmbed = {
    color: 'YELLOW',
    title: 'User Warned',
    fields: [
      {
        name: 'User',
        value: user.tag
      },
      {
        name: 'Moderator',
        value: message.author.tag
      },
      {
        name: 'Reason',
        value: reason
      },
      {
        name: 'Time',
        value: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    ]
  };

  const warnChannel = message.guild.channels.cache.find(channel => channel.name === 'warnings');
  if (warnChannel) {
    warnChannel.send({ embeds: [warnEmbed] });
  } else {
    message.guild.channels.create('warnings', {
      type: 'text',
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL']
        }
      ]
    }).then(channel => {
      channel.send({ embeds: [warnEmbed] });
    });
  }

  logger.info(`User ${user.tag} warned by ${message.author.tag} for: ${reason}`);
};

module.exports = warn;