const { PublicKey } = require("@solana/web3.js");

module.exports = {
    name: "check",
    description: "Verifica o saldo de uma carteira Solana",
    async execute(message, args, connection) {
        if (!args[0]) {
            return; // Ignora se nenhum argumento foi fornecido
        }

        const publicKeyString = args[0];
        try {
            const publicKey = new PublicKey(publicKeyString);
            const balance = await connection.getBalance(publicKey);
            message.reply(
                `O saldo da carteira ${publicKeyString} é de ${(balance / Math.pow(10, 9)).toFixed(8)} SOL.`,
            );
        } catch (error) {
            console.error(error);
            message.reply(
                "Ocorreu um erro ao verificar o saldo. Por favor, verifique se a chave pública está correta e tente novamente.",
            );
        }
    },
};
