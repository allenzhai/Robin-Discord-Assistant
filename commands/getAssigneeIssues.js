const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    var assignee = args[0];

    const response = await axios.get(`${API}issue/${owner}/${repo}/assignee/${assignee}`);

    if (typeof response.data === "undefined") {
        return response;
    }

    var names = [];
    var number = [];
    var responseData = response.data;
    for (var i = 0; i < responseData.length; i++) {
        names.push(responseData[i].title);
        number.push(responseData[i].number);
    }

    if (names.length == 0) {
        return 'There are no open issues assigned to ' + assignee + '.';
    }
    else{
        message = `Here are the ${names.length} issues assigned to ${assignee}: `;
        for (var j = 0; j < names.length; j++) {
            message += `(${number[j]}) ${names[j]}`
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
