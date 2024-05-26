// File: spamDetection.js

const Discord = require('discord.js');
const winston = require('winston');

// Function to detect spam messages
function detectSpamMessage(message) {
  const spamThreshold = 5; // Define the number of messages in a short time to be considered spam
  const spamInterval = 5000; // Define the time interval in milliseconds for spam detection

  const { author, channel } = message;
  
  if (author.bot) return; // Ignore messages from bots
  
  const now = Date.now();
  const userMessages = channel.messages.cache.filter(msg => msg.author.id === author.id && now - msg.createdTimestamp < spamInterval);
  
  if (userMessages.size > spamThreshold) {
    // Take action against the user for spamming
    channel.send(`${author}, please refrain from spamming.`);
    
    // Log the spamming behavior
    winston.info(`${author.username}#${author.discriminator} (${author.id}) is spamming in ${channel.name} (${channel.id}).`);
  }
}

module.exports = {
  detectSpamMessage,
};