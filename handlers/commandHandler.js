const fs = require("fs");
const path = require("path");

module.exports = (client) => {
    client.handleCommands = async () => {
        const modulesPath = path.join(__dirname, "..", "modules");
        const commandFiles = [];

        // Function to recursively get all .js files
        const getFiles = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    getFiles(filePath);
                } else if (file.endsWith(".js")) {
                    commandFiles.push(filePath);
                }
            }
        };

        // Get all command files
        getFiles(modulesPath);

        for (const filePath of commandFiles) {
            const command = require(filePath);
            if (command.name) {
                await client.commands.set(command.name, command);
            }
        }
    }
}