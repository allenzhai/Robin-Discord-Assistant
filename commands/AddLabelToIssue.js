const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

// #AddLabelToIssue label issueNum
module.exports = async function(args, repo, owner, token) {
    var labels = args[0];
    labels = labels.split(", ");
    const issue_num = args[1];
    var message = `There was a problem adding ${args[0]} to ${issue_num}`;
    const response = await axios.get(`${API}issue/${owner}/${repo}/${issue_num}`);
    
    if (response.status == 200) {
        var issueLabels = [];
        var responseData = response.data.labels;
    
        for (var i = 0; i < responseData.length; i++) {
            issueLabels.push(responseData[i].name);
        }
    
        for (var i = 0; i < labels.length; i++){
            issueLabels.push(labels[i]);
        }
        
        const body = {
            labels : issueLabels,
            token : token
        }
        
        const result = await axios.post(`${API}issue/${owner}/${repo}/${issue_num}/update`,
            body            
        );

        if (result.status == 200) {
            message = `Sucessfully added ${args[0]} to ${issue_num}`;
        }
    }

    return message;
}
