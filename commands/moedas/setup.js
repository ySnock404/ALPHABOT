const { Keypair, Connection, clusterApiUrl } = require("@solana/web3.js");
const fs = require("fs");
const crypto = require("crypto");
const { Buffer } = require("buffer");
const { verifyWalletCanReceiveSOL } = require("../utils/verifyWallet");

// Configurações de criptografia
const algorithm = "aes-256-cbc";
const secretKey = Buffer.from(process.env.SECRET_KEY, "hex"); // Utilizando a chave secreta das variáveis de ambiente
const iv = crypto.randomBytes(16); // IV pode ser público, mas deve ser único para cada criptografia

module.exports = {
    name: "setup",
    description: "Configura uma nova carteira Solana",
    async execute(message, args, connection, wallets, walletsFile) {
        const userId = message.author.id;
        if (!wallets[userId]) {
            const wallet = Keypair.generate();

            // Criptografa a chave privada
            const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
            let encrypted = cipher.update(Buffer.from(wallet.secretKey));
            encrypted = Buffer.concat([encrypted, cipher.final()]);

            wallets[userId] = {
                publicKey: wallet.publicKey.toString(),
                secretKey: encrypted.toString("hex"),
                iv: iv.toString("hex"),
            };

            fs.writeFileSync(walletsFile, JSON.stringify(wallets, null, 2));
            message.reply(
                `Carteira Solana criada com sucesso! Sua chave pública é: ${wallet.publicKey}`,
            );

            // Verificar se a carteira pode receber SOL
            const connection = new Connection(clusterApiUrl("mainnet-beta"));
            const canReceive = await verifyWalletCanReceiveSOL(
                wallet.publicKey.toString(),
                connection
            );
            if (canReceive) {
                message.reply("A carteira pode receber SOL.");
            } else {
                message.reply(
                    "A carteira não pode receber SOL. Algo deu errado.",
                );
            }
        } else {
            message.reply("Você já possui uma carteira configurada.");
        }
    },
};
