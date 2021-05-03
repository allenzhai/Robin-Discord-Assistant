module.exports = function(args, id, userOwners) {
    userOwners.set(id, args[0]);
}