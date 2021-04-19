require('dotenv').config();

const ApprovePR                 = require("./commands/ApprovePR.js");
const GetReviewers              = require("./commands/GetReviewers.js");
const CreateIssue               = require("./commands/createIssue.js");
const CloseIssue                = require("./commands/CloseIssue.js");
const AddLabelToIssue           = require("./commands/AddLabelToIssue.js");
const AddUserToIssue            = require("./commands/AddUserToIssue.js");
const CreateIssueComment        = require("./commands/CreateIssueComment.js");
const GetLabels                 = require("./commands/GetLabels.js");
const GetAssigneeIssues         = require("./commands/GetAssigneeIssues.js");
const GetIssuesWithLabel        = require("./commands/GetIssuesWithLabel.js");
const SetOwnerName              = require("./commands/SetOwnerName.js");
const SetRepoName               = require("./commands/SetRepoName.js");
const GetIssueAssignees         = require("./commands/GetIssueAssignees.js");
const GetMedianReviewTime       = require("./commands/GetMedianReviewTime.js");
const MergeBranch               = require("./commands/MergeBranch.js");
const MergePR                   = require("./commands/MergePR.js");
const NumIssues                 = require("./commands/NumIssues.js");
const CreatePR                  = require("./commands/CreatePR.js");
const NumPrs                    = require("./commands/NumPrs.js");
const GetPROwners               = require("./commands/GetPROwners.js");
const GetOldestIssue            = require("./commands/GetOldestIssue.js");
const GetNumAssignedOpenIssues  = require("./commands/GetNumAssignedOpenIssues.js");
const GetLastContributor        = require("./commands/GetLastContributor.js");
const GetUnassignedTasks        = require("./commands/GetUnassignedTasks.js");
const GetBuildStatus            = require("./commands/GetBuildStatus.js");
const Help                      = require("./commands/Help.js");
const SetGithubToken            = require("./commands/SetGithubToken.js");

const aesjs = require('aes-js');



const commands = { ApprovePR, GetReviewers, CreateIssue, CloseIssue, AddLabelToIssue, AddUserToIssue, CreateIssueComment, 
    GetLabels, GetAssigneeIssues, GetIssuesWithLabel, SetOwnerName, SetRepoName, GetIssueAssignees, GetMedianReviewTime, 
    MergeBranch, MergePR, NumIssues, CreatePR, NumPrs, GetPROwners, GetOldestIssue, 
    GetNumAssignedOpenIssues, GetLastContributor, GetUnassignedTasks, GetBuildStatus, Help, SetGithubToken};

module.exports = async function(message, users) {
    let args = message.content.split(" ");
    let command =  args.shift();

    if (command.charAt(0) === "#") {
        // Robin Commands
        console.log("Valid Robin Command");
        command = command.substring(1);
        console.log(command);

        if (command === "SetGithubToken"){
            var token = await commands[command](args);
            var key = [];
            for (var i = 0; i < process.env.KEY.length; i++) {
                key.push(process.env.KEY.charCodeAt(i));
            }

            var textBytes = aesjs.utils.utf8.toBytes(token);

            var aesCtr = new aesjs.ModeOfOperation.ctr(key);
            var encryptedBytes = aesCtr.encrypt(textBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            users.set(message.author.id, encryptedHex);
            await message.author.send(`Updated Token to ${token}`);
        }
        else{
            reply = commands[command](args);
            console.log(reply);
            await message.author.send(reply);
        }
    }
    // check if it is a text channel
    if (message.channel.type != 'dm'){
        await message.channel.bulkDelete(20, true)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
    }
}