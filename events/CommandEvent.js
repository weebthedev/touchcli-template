const config = require(`../config/config.json`);
const colors = require(`../config/config.json`).colors;


module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const member = await message.member;

        if (message.webhookID) return;
        if (member.bot) return;

        let prefix = config.prefix;
        if (!prefix) {
            const errorEmbed = {
                title: "Huh?",
                description: "The developer did something wrong. Please contact the developer to fix this issue.",
                color: colors.red
            };
            await message.createMessage({
                embeds: [errorEmbed],
                isPrivate: true
            });
            return;
        }

        const rawMessage = message.content;
        const args = rawMessage.split(" ");

        if (!rawMessage.startsWith(prefix)) return;
        if (rawMessage.startsWith(`![](`)) return;

        const commandName = args[0].replace(prefix, "");

        if (!client.commands.get(commandName)) {
            const embed = {
                title: `There was an issue!`,
                description: `**There was an issue!**`,
                fields: [
                    { name: `Error`, value: `Command not found!` },
                    { name: `Fix`, value: `> Ensure you type the command in correctly, if this doesn't fix the error.` }
                ]
            };
            await message.createMessage({ embeds: [embed], isPrivate: true });
            return;
        }

        client.commands.get(commandName).execute(message, args, client);
    }
};