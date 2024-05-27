const fs = require('fs');
const { loadCommands } = require("./utils/loadCommands");
const { loadWallets } = require("./utils/loadWallets");
const { createSolanaConnection } = require("./utils/solanaConnection");
const messageHandler = require("./handlers/messageHandler");
const { setupReadyHandler } = require("./readyHandler");
const admins = JSON.parse(fs.readFileSync('./admins.json', 'utf-8')).admins;
var wallets = loadWallets(walletsFile);
var walletsFile = "./wallets.json";

const connection = createSolanaConnection();

async function initializeBot(client) {
    await loadCommands(client);

    walletsFile = "./wallets.json";
    wallets = loadWallets(walletsFile);

    setupReadyHandler(client, wallets);

    client.on('messageCreate', async (message) => {
        messageHandler(message, client, connection, wallets, walletsFile, admins);
    });

    client.login(process.env.DISCORD_TOKEN).catch(async (error) => {
        const { default: chalk } = await import("chalk");
        console.error(chalk.red("Erro ao fazer login:"), error);
    });
}

module.exports = { initializeBot };
