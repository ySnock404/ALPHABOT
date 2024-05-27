const { loadCommands } = require("../utils/loadCommands");
const { loadWallets } = require("../utils/loadWallets");
const { Client, GatewayIntentBits } = require("discord.js");

const { initializeBot } = require('../bot.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const walletsFile = "./wallets.json";
var wallets;

var sentMessage;

module.exports = {
    name: "refresh",
    description: "Recarrega os comandos e configurações do bot (Admin Only)",
    async execute(message, args, connection, wallets, walletsFile) {
        try {
            sentMessage = await message.reply(
                "A recarregar os comandos e configurações...",
            );
            await loadCommands(client);
            wallets = loadWallets(walletsFile);
            await sentMessage.edit(
                "Os comandos e configurações foram recarregados com sucesso!",
            );
        } catch (error) {
            console.error(
                `Erro ao recarregar os comandos e configurações: ${error}`,
            );
            await sentMessage.edit(
                "Ocorreu um erro ao recarregar os comandos e configurações.",
            );
        }
    },
};
