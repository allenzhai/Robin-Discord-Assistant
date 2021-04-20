module.exports =  function(which, repo, owner) {
    var message = '';

    for (i = 0; i < which.length; i++ ){
        switch (which[i]){
            case 'Branch':
                // Branch Commands
                message += "\nCommands related to Branches:\n";
                message += '#MergeBranch [base] [head] [message]\n';            // MergeBranch
                break;
            case 'Commit':
                // Commit Commands
                message += "\nCommands related to Commits:\n";
                message += '#GetBuildStatus [commit SHA]\n';                    //GetBuildStatus 
                break;
            case 'Issue':
                // Issue Commands
                message += "\nCommands related to Issues:\n";
                message += '#AddLabelToIssue [label] [issue number]\n';         // AddLabelToIssue
                message += '#AddUserToIssue [user] [issue]\n';                  // AddUserToIssue        
                message += '#CloseIssue [issue number] [comment]\n';          // CloseIssue
                message += '#CreateIssue [title] [labels] [assignees]\n';       // CreateIssue
                message += '#CreateIssueComment [issue number] [comment]\n';    // CreateIssueComment
                message += '#GetAssigneeIssues [assignee]\n';                   // GetAssigneeIssues
                message += '#GetIssueAssignees [issue number]\n';               // GetIssueAssignees
                message += '#GetIssuesWithLabel [label]\n';                     // GetIssuesWithLabel
                message += '#GetNumAssignedOpenIssues\n';                       // GetNumAssignedOpenIssues
                message += '#GetOldestIssue\n';                                 // GetOldestIssue
                message += '#NumIssues\n';                                      // NumIssues
                break;
            case 'PR':
                // PR Commands
                message += "\nCommands related to PRs:\n";
                message += '#ApprovePR [PR number] [comment]\n';              // ApprovePR
                message += '#CreatePR [title] [head branch] [base branch]\n';   // CreatePR
                message += '#GetMedianReviewTime\n';                            // GetMedianReviewTime
                message += '#GetPROwners\n';                                    // GetPROwners
                message += '#GetReviewers [PR number]\n';                       // GetReviewers
                message += '#MergePR [PR number] [message]\n';                  // Merge PR
                message += '#NumPRs\n';                                         // NumPRs
                break;
            case 'Repo':
                // Repository Commands
                message += "\nCommands related to Repos:\n";
                message += '#GetLabels [issue number]\n';                       // GetLabels
                message += '#GetLastContributor\n';                             // GetLastContributor   
                message += '#GetUnassignedTasks\n';                             // GetUnassignedTasks
                break;
            case 'Settings':
                // User Commands
                message += "\nCommands for setting up session:\n";
                message += '#SetOwnerName [owner]\n';                          // GiveOwnerName
                message += '#SetRepoName [repo name]\n';                       // GiveRepoName
                message += '#SetGithubToken [token]\n';                        // SetGithubToken
                break;
            default:
                message += '\nMake sure to give set owner and repo names under \'Help Settings\'\n';
                message += '#Help Branch for commands related to branches\n';
                message += '#Help Commit for commands related to commits\n';
                message += '#Help Issue for commands related to issues\n';
                message += '#Help PR for commands related to PRs\n';
                message += '#Help Repo for commands related to repos\n';
                message += '#Help Settings for commands related to setting up session\n';
                break;
            }
    }
    
    return message
}




    
   







