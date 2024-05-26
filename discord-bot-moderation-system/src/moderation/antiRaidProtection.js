// File: antiRaidProtection.js

const { Client } = require('discord.js');

const client = new Client();

client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  const raidDetectionThreshold = 5;
  const raidDetectionInterval = 10000; // 10 seconds

  let joinQueue = guild.fetchQueue || [];
  joinQueue.push(Date.now());

  guild.fetchQueue = joinQueue.filter((time) => time > Date.now() - raidDetectionInterval);

  if (guild.fetchQueue.length >= raidDetectionThreshold) {
    member.ban({ reason: 'Raid Protection: Detected potential raid.' })
      .then(() => console.log(`Banned ${member.user.tag} for potential raid.`))
      .catch(console.error);
  }
});

client.login('your-bot-token');

module.exports = client;