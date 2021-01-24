const ApprovePR            = require("./commands/ApprovePR.js");
const GetReviewers         = require("./commands/GetReviewers.js");
const CreateIssue          = require("./commands/createIssue.js");
const CloseIssue           = require("./commands/CloseIssue.js");
const AddLabelToIssue      = require("./commands/AddLabelToIssue.js");
const AddUserToIssue       = require("./commands/AddUserToIssue.js");
const CreateIssueComment   = require("./commands/CreateIssueComment.js");
const GetLabels            = require("./commands/GetLabels.js");
const GetAssigneeIssues    = require("./commands/GetAssigneeIssues.js");
const GetIssuesWithLabel   = require("./commands/GetIssuesWithLabel.js");
const GiveOwnerName        = require("./commands/GiveOwnerName.js");
const GiveRepoName         = require("./commands/GiveRepoName.js");
const GetIssueAssignees    = require("./commands/GetIssueAssignees.js");
const GetMedianReviewTime  = require("./commands/GetMedianReviewTime.js");
const MergeBranch          = require("./commands/MergeBranch.js");
const MergePR              = require("./commands/MergePR.js");
const NumIssues            = require("./commands/NumIssues.js");
const CreatePR             = require("./commands/CreatePR.js");
const NumPrs               = require("./commands/NumPrs.js");
const GetPROwners          = require("./commands/GetPROwners.js");
const GetOldestIssue       = require("./commands/GetOldestIssue.js");
const GetNumAssignedOpen   = require("./commands/GetNumAssignedOpen.js");
const GetLastContributor   = require("./commands/GetLastContributor.js");
const GetUnassignedTasks   = require("./commands/GetUnassignedTasks.js");
const GetBuildStatus       = require("./commands/GetBuildStatus.js");
const Help                 = require("./commands/Help.js");



const commands = { ApprovePR, GetReviewers, CreateIssue, CloseIssue, AddLabelToIssue, AddUserToIssue, CreateIssueComment, 
    GetLabels, GetAssigneeIssues, GetIssuesWithLabel, GiveOwnerName, GiveRepoName, GetIssueAssignees, GetMedianReviewTime, 
    MergeBranch, MergePR, NumIssues, CreatePR, NumPrs, GetPROwners, GetOldestIssue, 
    GetNumAssignedOpen, GetLastContributor, GetUnassignedTasks, GetBuildStatus, Help};

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