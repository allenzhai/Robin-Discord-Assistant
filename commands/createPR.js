const axios = require('axios');

const API = 'https://robinrestapi.herokuapp.com/';
getListOfNames = function(response, info) {
    var names = [];
    if (typeof response.data === "undefined") {
        return response;
    }
    var responseData = response.data;
    for (var i = 0; i < responseData.length; i++) {
        eval(info);
    }
    names = new Set(names);
    names = Array.from(names);
    return names;
}

findBranch = function (response, branch) {
    var branchNames = getListOfNames(response, 'names.push(responseData[i].name)')
    for (var i = 0; i < branchNames.length; i++) {
        var nameLower = branchNames[i].toLowerCase();
        if (nameLower.localeCompare(branch) == 0)  {
            return branchNames[i];
        }
    }
    console.error('no branch match found');
    return branch;
}

module.exports = async function(args, repo, owner) {
    const title = args[0];
    var base = args[1];
    if (typeof base === "undefined") {
        base = "master";
    }
    var head = args[2];

    var result = await axios.get(`${API}branch/${owner}/${repo}`);

    base = findBranch(result, base);
    head = findBranch(result, head);

    var message = `There was an error with opening this pull request. Please check if head branch ${head} and base branch ${base} exist`;

    body = {
        title : title,
        head : head,
        base : base
    }

    result = await axios.post(`${API}pr/${owner}/${repo}/create`,
        body            
    );

    if (result.status == 200) {
        message = `The pull request was successfully created as P.R. number ${result.data.number}`;
    }

    return message;
}