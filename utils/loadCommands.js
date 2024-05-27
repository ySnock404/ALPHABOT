const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

async function loadCommands(client) {
    const { default: chalk } = await import("chalk");

    client.commands = new Collection();
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Verificação adicional para garantir que o comando tenha `name` e `execute`
        if ("name" in command && "execute" in command) {
            client.commands.set(command.name, command);
        } else {
            console.log(chalk.red(`Erro ao carregar comando ${filePath}`));
        }
    }
}

module.exports = { loadCommands };