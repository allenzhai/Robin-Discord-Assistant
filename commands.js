const reviewPR             = require("./commands/reviewPR.js");
const getRepo              = require("./commands/getRepo.js");
const createPR             = require("./commands/createPR.js");
const createIssue          = require("./commands/createIssue.js");
const createIssueComment   = require("./commands/createIssueComment.js");
const getNumPRs            = require("./commands/getNumPRs.js");
const getPROwners          = require("./commands/getPROwners.js");
const getLabels            = require("./commands/getLabels.js");
const getIssuesWithLabel   = require("./commands/getIssuesWithLabel.js");
const getAssigneeIssues    = require("./commands/getAssigneeIssues.js");
const getIssues            = require("./commands/getIssues.js");
const getIssue             = require("./commands/getIssue.js");
const getSha               = require("./commands/getSha.js");
const mergePR              = require("./commands/mergePR.js");
const mergeBranch          = require("./commands/mergeBranch.js");
const listPRs              = require("./commands/listPRs.js");
const getUser              = require("./commands/getUser.js");
const getGitTree           = require("./commands/getGitTree.js");
const listBranches         = require("./commands/listBranches.js");
const getCommits           = require("./commands/getCommits.js");
const getCommitPath        = require("./commands/getCommitPath.js");
const getCommitBuildStatus = require("./commands/getCommitBuildStatus.js");
const getGithubURL         = require("./commands/getGithubURL.js");
const help                 = require("./commands/help.js");



const commands = { reviewPR, getRepo, createPR, createIssue, createIssueComment, getNumPRs, getPROwners, 
                   getLabels, getIssuesWithLabel, getAssigneeIssues, getIssues, getIssue, getSha, mergePR, 
                   mergeBranch, listPRs, getUser, getGitTree, listBranches, getCommits, getCommitPath, 
                   getCommitBuildStatus, getGithubURL, help};

module.exports = async function(message) {
    let args = message.content.split(" ");
    let command =  args.shift();


    if (command.charAt(0) === "#") {
        // Robin Commands
        console.log("Valid Robin Command");
        command = command.substring(1);
        console.log(command);

        commands[command](message, args);
    }
}