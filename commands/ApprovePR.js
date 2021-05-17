const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    const num = args[0];

    var message = `There was an error with reviewing this pull request`;

    const body = {
        strategy : "APPROVE"
    }

    const result = await axios.post(`${API}pr/${owner}/${repo}/review/${num}`,
        body            
    );

    if (result.status == 200) {
        message = `The pull request was successfully approved`;
    }

    return message;
}