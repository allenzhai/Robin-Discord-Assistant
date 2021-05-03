require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const commandHandler = require("./commands");

client.login(process.env.BOTTOKEN);

userRepos = new Map();
userOwners = new Map();
userTokens = new Map();

client.on('message', (msg) => {
    commandHandler(msg, userRepos, userOwners, userTokens);
});
