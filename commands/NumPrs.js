const axios = require('axios');
const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    const response = await axios.get(`${API}pr/${owner}/${repo}`);

    if (typeof response.data === "undefined") {
        return response;
    }

    return `The number of open pull requests in ${repo} is ${response.data.total_count}`;
}