const { Client } = require(`touchguild`);
const fs = require(`fs`)
const config = require(`./config/config.json`);
const client = new Client({ token: config.token });

const handlerFiles = fs.readdirSync("./handlers/").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

const commandFolders = fs.readdirSync("./modules");

 
(async () => {

    for (const file of handlerFiles) {
        require(`./handlers/${file}`)(client);
    }

    client.commands = new Map();

    client.registerEvents(eventFiles, "./events");
    client.handleCommands(commandFolders)

    await client.connect(config.token);
})();