const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';

module.exports = async function(args, repo, owner) {
    const title = args[0];
    var labels;
    var assignees;

    if (args[1] == undefined){
        labels = []
    }
    else {
        labels = args[1].split(',');
    }

    if (args[2] == undefined){
        assignees = []
    }
    else {
        assignees = args[2].split(',');
    }

    var message = `There was an error with creating this issue`;

    const body = {
        title : title,
        labels : labels,
        assignees : assignees
    }

    const result = await axios.post(`${API}issue/${owner}/${repo}/create`,
        body            
    );

    if (result.status == 200) {
        message = `The issue was successfully created as issue number ${result.data.number}`;
    }

    return message;
}