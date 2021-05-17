const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    const issueNum = args.shift();
    const comment = args.join(' ');

    console.log(issueNum, comment);

    var message = `There was an error with updating this issue`;

    var body = {
        body: comment
    }

    const result = await axios.post(`${API}issue/${owner}/${repo}/${issueNum}/comment`,
        body            
    );

    if (result.status == 200) {
        message = `Issue number ${issueNum} was successfully updated`;
    }

    return message;
}