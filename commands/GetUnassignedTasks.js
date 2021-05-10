const axios = require('axios');
const API = 'https://robinrestapi.herokuapp.com/';

getListOfUnassignedIssues = function (response) {
    var issues = [];
    if (typeof response.data === "undefined") {
        return response;
    }
    var responseData = response.data;
    for (var i = 0; i < responseData.length; i++) {
        if (!responseData[i].pull_request && responseData[i].assignees.length == 0)
        {
            issues.push(responseData[i].number + ' ' + responseData[i].title);
        }
    }
    issues = Array.from(issues);

    return issues;
}

module.exports = async function(args, repo, owner) {
    var message = '';
    var response = await axios.get(`${API}issue/${owner}/${repo}`);

    
    if (response.status != 200) {
        return `There was an error getting the unassigned tasks.`;
    }
    
    var issues = getListOfUnassignedIssues(response);

    var message = `There are a total of ${issues.length} unassigned issues:\n`
    if (issues.length == 0) {
        message += 'All issues are assigned to someone!';
    }
    else {
        for (var j = 0; j < issues.length; j++) {
            message += issues[j];
            if (j == issues.length - 1) {
                message += '.';
            }
            else {
                message += ',\n';
            }
        }  
    }
    return message;
}