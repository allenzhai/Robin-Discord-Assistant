module.exports = function(args, id, userRepos) {
    userRepos.set(id, args[0]);
}