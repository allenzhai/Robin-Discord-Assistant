const axios = require('axios');
const { Client } = require('discord.js');

const API = 'https://robinrestapi.herokuapp.com/';

// #AddLabelToIssue label issueNum
module.exports = async function(args, repo, owner, token) {
    const label = args[0];
    const issue_num = args[1];
    const response = await axios.get(`${API}issue/${owner}/${repo}/issues/${issue_num}`);
    var message = `There was a problem adding ${label} to ${issue_num}`;

    if (response.status == 200) {
        var repoLabels = [];
        var responseData = response.data.labels;
    
        for (var i = 0; i < responseData.length; i++) {
            repoLabels.push(responseData[i].name);
        }
    
        repoLabels.push(label);
    
        const body = {
            labels : repoLabels,
            token  : token
        }

        const result = await axios.patch(`${API}issue/${owner}/${repo}/${issue_num}/update`,
            body            
        );

        if (result.status == 200) {
            message = `Sucessfully added ${label} to ${issue_num}`;
        }
    }

    return message;
}