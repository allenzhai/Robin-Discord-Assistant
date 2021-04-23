const axios = require('axios');
const { response } = require('msw');
const API = 'https://robinrestapi.herokuapp.com/';


module.exports = async function(args, repo, owner) {
    var message = 'The available labels in this repository are ';
    var response = await axios.get(`${API}repo/labels/${owner}/${repo}`);
    var responseData = response.data;

    var names = [];
    if (typeof response.data === "undefined" || responseData.length == 0) {
        message = 'There are no available labels in this repository.';
        return message;
    }
    
    for (var i = 0; i < responseData.length; i++) {
        names.push(responseData[i].name);
    }

    for (var j = 0; j < names.length; j++) {
        message += names[j];
        if (j == names.length - 1) {
            message += '.';
        }
        else if (j == names.length - 2) {
            message += ' and ';
        }
        else {
            message += ', ';
        }
    }

    return message;
    
    
}