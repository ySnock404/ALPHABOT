const { EmbedBuilder } = require("discord.js");
const { Connection, PublicKey } = require("@solana/web3.js");
const axios = require("axios");
const fs = require("fs");

module.exports = {
    name: "menu",
    description: "Mostra o menu com informações de Solana e links úteis",
    async execute(message, args) {
        const userId = message.author.id;

        // Load the wallets database
        const wallets = JSON.parse(fs.readFileSync("./wallets.json", "utf8"));

        if (!wallets[userId] || !wallets[userId].publicKey) {
            return message.reply(
                "Ainda não configuraste uma carteira. Usa o comando !setup para criar uma.",
            );
        }

        const userAddress = wallets[userId].publicKey;

        // Connect to the Solana network (using mainnet-beta as an example)
        const connection = new Connection(
            "https://api.mainnet-beta.solana.com",
        );

        try {
            // Check if the provided address is a valid base58 address
            const publicKey = new PublicKey(userAddress);

            // Check the balance of the provided address
            const balance = await connection.getBalance(publicKey);
            const solBalance = (balance / 1e9).toFixed(4); // Convert lamports to SOL and format with 4 decimal places

            // Get the exchange rate from SOL to USD
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
            );
            const solToUsdRate = response.data.solana.usd;
            const solBalanceInUsd = (solBalance * solToUsdRate).toFixed(2);

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: "Solana",
                    iconURL:
                        "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
                })
                .addFields(
                    {
                        name: "Endereço",
                        value: `[Clique aqui para copiar o endereço](https://solscan.io/account/${userAddress})\n\`${userAddress}\``,
                        inline: false,
                    },
                    {
                        name: "Saldo",
                        value: `${solBalance} SOL ($${solBalanceInUsd})`,
                        inline: false,
                    },
                    {
                        name: "Cenas",
                        value: "Clique no botão Refresh que não existe lol para atualizar seu saldo atual.",
                        inline: false,
                    },
                    {
                        name: "Grupo no Telegram",
                        value: "[@bot_snockas](https://t.me/aindanãoexistebro)",
                        inline: false,
                    },
                )
                .setTimestamp()
                .setFooter({ text: "Atualizado às" });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Erro ao verificar saldo:", error);
            message.reply(
                "Houve um erro ao verificar o saldo. Verifique se o endereço fornecido é válido.",
            );
        }
    },
};
