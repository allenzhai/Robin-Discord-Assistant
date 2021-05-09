const axios = require('axios');
const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    var response = await axios.get(`${API}issue/${owner}/${repo}/1/100`);

    var totalCount = response.data.total_count;
    
    if (totalCount > 100) {
        pageNum = Math.ceil(totalCount/100);
        response = await axios.get(`${API}issue/${owner}/${repo}/1/100`);
    }

    var responseData = response.data.items;
    if (responseData.length == 0) {
        return "There are no issues in this repository";
    }
   
    var lastIssue = responseData[responseData.length-1];
    var title = lastIssue.title;
    var issueCreator = lastIssue.user.login;
    var createdAt = new Date(lastIssue.created_at);
    var month = createdAt.toLocaleString('default', { month: 'long' });
    var num = lastIssue.number

    var message = `The oldest issue was created on ${month} ${createdAt.getUTCDate()}, ${createdAt.getUTCFullYear()} by ${issueCreator} with title ${title} and number ${num}`;

    return message;
}