const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    var issue_num = args[0];

    const response = await axios.get(`${API}issue/${owner}/${repo}/${issue_num}`);

    if (typeof response.data === "undefined") {
        return response;
    }

    var names = [];
    var responseData = response.data.assignees;
    for (var i = 0; i < responseData.length; i++) {
        names.push(responseData[i].login);
    }

    if (names.length == 0) {
        return 'There are no assignees assigned to ' + issue_num + '.';
    }
    else{
        message = `Here are the ${names.length} assignees assgined to (#${issue_num}) ${response.data.title}: `;
        for (var j = 0; j < names.length; j++) {
            message += `${names[j]}`;
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