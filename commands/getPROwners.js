const axios = require('axios');
const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    var message = '';
    const response = await axios.get(`${API}pr/${owner}/${repo}/owners`);

    if (typeof response.data === "undefined") {
        return response;
    }

    var names = [];
    var responseData = response.data;
    for (var i = 0; i < responseData.length; i++) {
        names.push(responseData[i].user.login);
    }

    names = new Set(names);
    names = Array.from(names);

    if (names.length == 0) {
        return 'There are currently no p.r. authors in this repository';
    }
    else{
        message = `Here are the most recent pull request authors: `;
        for (var j = 0; j < names.length; j++) {
            message += names[j]
            if (j == names.length - 1) {
                message += '.';
            }
            else {
                message += ', ';
            }
        }    
    }

    return message;
}