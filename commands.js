require('dotenv').config();

const ApprovePR                 = require("./commands/ApprovePR.js");
const GetReviewers              = require("./commands/GetReviewers.js");
const CreateIssue               = require("./commands/CreateIssue.js");
const CloseIssue                = require("./commands/CloseIssue.js");
const AddLabelToIssue           = require("./commands/AddLabelToIssue.js");
const AddUserToIssue            = require("./commands/AddUserToIssue.js");
const CreateIssueComment        = require("./commands/CreateIssueComment.js");
const GetLabels                 = require("./commands/GetLabels.js");
const GetIssueAssignees         = require("./commands/GetIssueAssignees.js");
const GetIssuesWithLabel        = require("./commands/GetIssuesWithLabel.js");
const SetOwnerName              = require("./commands/SetOwnerName.js");
const SetRepoName               = require("./commands/SetRepoName.js");
const GetAssigneeIssues         = require("./commands/GetAssigneeIssues.js");
const GetMedianReviewTime       = require("./commands/GetMedianReviewTime.js");
const MergeBranch               = require("./commands/MergeBranch.js");
const MergePR                   = require("./commands/MergePR.js");
const NumIssues                 = require("./commands/NumIssues.js");
const CreatePR                  = require("./commands/CreatePR.js");
const NumPRs                    = require("./commands/NumPrs.js");
const GetPROwners               = require("./commands/GetPROwners.js");
const GetOldestIssue            = require("./commands/GetOldestIssue.js");
const GetNumAssignedOpenIssues  = require("./commands/GetNumAssignedOpenIssues.js");
const GetLastContributor        = require("./commands/GetLastContributor.js");
const GetUnassignedTasks        = require("./commands/GetUnassignedTasks.js");
const GetBuildStatus            = require("./commands/GetBuildStatus.js");
const Help                      = require("./commands/Help.js");
const SetGithubToken            = require("./commands/SetGithubToken.js");
const SignIn                    = require("./commands/SignIn.js");

const aesjs = require('aes-js');



const commands = { ApprovePR, GetReviewers, CreateIssue, CloseIssue, AddLabelToIssue, AddUserToIssue, CreateIssueComment, 
    GetLabels, GetAssigneeIssues, GetIssuesWithLabel, SetOwnerName, SetRepoName, GetIssueAssignees, GetMedianReviewTime, 
    MergeBranch, MergePR, NumIssues, CreatePR, NumPRs, GetPROwners, GetOldestIssue, 
    GetNumAssignedOpenIssues, GetLastContributor, GetUnassignedTasks, GetBuildStatus, Help, SetGithubToken,};

module.exports = async function(message, userRepos, userOwners, userTokens) {
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
            userTokens.set(message.author.id, encryptedHex);
            await message.author.send(`Updated Token to ${token}`);
        }
        else if (command === "SetRepoName") {
            await commands[command](args, message.author.id, userRepos);
            message.author.send(`Set Repo name to ${args[0]}`);
        }
        else if (command === "SetOwnerName") {
            await commands[command](args, message.author.id, userOwners);
            message.author.send(`Set Owner name to ${args[0]}`);
        }
        else{
            reply = '';
            if (!userRepos.get(message.author.id)) {
                reply = "\nPlease set the Repository name with #SetRepoName [name]\n";
            }
            if (!userOwners.get(message.author.id)) {
                reply += "Please set the Owner name with #SetOwnerName [name]\n";
            }
            if (userRepos.get(message.author.id) && userOwners.get(message.author.id))
            reply = await commands[command](args, 
                                            userRepos.get(message.author.id), 
                                            userOwners.get(message.author.id), 
                                            userTokens.get(message.author.id));
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
