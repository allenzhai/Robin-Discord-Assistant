const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    const issueNum = args[0];

    var message = `There was an error with closing this issue`;

    var body = {
        state: "closed",
    }

    const result = await axios.patch(`${API}issue/${owner}/${repo}/${issueNum}/update`,
        body            
    );

    if (result.status == 200) {
        message = `Issue number ${result.data.number} was successfully closed`;
    }

    return message;
}