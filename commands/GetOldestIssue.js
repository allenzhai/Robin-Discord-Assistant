const fetch = require("node-fetch");

module.exports = async function(message, args) {
    const url = 'http://localhost:5000/api/getUser/allenzhai';
    const response = await fetch(url);
    console.log(response);
}