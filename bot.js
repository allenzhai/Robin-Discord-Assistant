require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const commandHandler = require("./commands");

client.login(process.env.BOTTOKEN);

users = new Map();
users.set("Allen", 1337);

client.on('message', (msg) => {
    commandHandler(msg, users);
});
