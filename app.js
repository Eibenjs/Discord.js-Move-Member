const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const {
  create
} = require('domain');
const moveMember = require('./Commands/moveMember');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('ready',async () => {
  moveMember(client);
});
client.login(config.token);

