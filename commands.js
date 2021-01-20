

//const commands = { }

module.exports = async function(message) {
    let args = message.content.split(" ");
    let command =  args.shift();


    if (command.charAt(0) === "#") {
        // Robin Commands
        console.log("Valid Robin Command");
        console.log(command);
        command = command.substring(1);

        commands[command](message, args);

        // Further filtering for commands below
    }
}