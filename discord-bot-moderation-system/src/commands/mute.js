// mute.js

const { Permissions } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Mute a user in the server',
  execute(message, args) {
    if (!message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return message.reply('You do not have the required permissions to mute members.');
    }

    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please mention the user you want to mute.');
    }

    const member = message.guild.members.cache.get(target.id);
    if (member) {
      if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        return message.reply('Cannot mute an administrator.');
      }

      const role = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (!role) {
        return message.reply('Muted role not found. Please create a role named "Muted" with the appropriate permissions.');
      }

      member.roles.add(role).then(() => {
        message.reply(`Successfully muted ${target.tag}.`);
      }).catch(err => {
        console.error(err);
        message.reply('Failed to mute the user. Please try again.');
      });
    } else {
      message.reply('User not found in the server.');
    }
  },
};