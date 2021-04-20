const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

// #AddUserToIssue label issueNum
module.exports = async function(args, repo, owner, token) {
    var names = args[0];
    names = names.split(", ");

    const issue_num = args[1];
    var message = `There was a problem adding ${args[0]} to ${issue_num}`;
    const response = await axios.get(`${API}issue/${owner}/${repo}/issues/${issue_num}`);
    
    if (response.status == 200) {
        var issueNames = [];
        var responseData = response.data.assignees;
    
        for (var i = 0; i < responseData.length; i++) {
            issueNames.push(responseData[i].login);
        }
    
        for (var i = 0; i < names.length; i++){
            issueNames.push(names[i]);
        }

        const body = {
            assignees : issueNames,
            token  : token
        }

        const result = await axios.patch(`${API}issue/${owner}/${repo}/${issue_num}/update`,
            body            
        );

        if (result.status == 200) {
            message = `Sucessfully added ${args[0]} to ${issue_num}`;
        }
    }

    return message;
}
