const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const messageHandler = require("./handlers/messageHandler");

dotenv.config();

const { initializeBot } = require("./bot");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

initializeBot(client);
