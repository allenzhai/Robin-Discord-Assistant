require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

// need to move this .env file
client.login(process.env.BOTOKEN);

client.on('ready', online);

function online(){
    console.log('Ready');
}