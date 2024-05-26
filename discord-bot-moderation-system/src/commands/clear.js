// File: clear.js

const { Permissions } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Clears a specified number of messages in the channel.',
  usage: '<number>',
  execute(message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return message.reply('You do not have permission to use this command.');
    }

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('Please provide a valid number of messages to clear.');
    } else if (amount <= 1 || amount > 100) {
      return message.reply('You can only delete between 1 and 99 messages.');
    }

    message.channel.bulkDelete(amount, true)
      .then(deletedMessages => {
        message.channel.send(`Successfully cleared ${deletedMessages.size - 1} messages.`)
          .then(sentMessage => {
            setTimeout(() => sentMessage.delete(), 5000);
          });
      })
      .catch(error => {
        console.error(`Error clearing messages: ${error}`);
        message.reply('There was an error clearing messages.');
      });
  },
};