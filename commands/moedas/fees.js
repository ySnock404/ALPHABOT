const { EmbedBuilder } = require("discord.js");
const {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

module.exports = {
    name: "fees",
    description: "Verifica as taxas de envio na rede Solana.",
    async execute(message, args) {
        const connection = new Connection(
            clusterApiUrl("mainnet-beta"),
            "confirmed",
        );

        try {
            const recentBlockhash = await connection.getRecentBlockhash();
            const feeCalculator = await connection.getFeeCalculatorForBlockhash(
                recentBlockhash.blockhash,
            );

            const feeInLamports = feeCalculator.value.lamportsPerSignature;
            const feeInSol = feeInLamports / LAMPORTS_PER_SOL;

            const embed = new EmbedBuilder()
                .setTitle("Taxas de Envio na Rede Solana")
                .setDescription(
                    `Taxa média por transação: ${feeInSol.toFixed(8)} SOL (${feeInLamports} lamports)`,
                )
                .setTimestamp()
                .setFooter({ text: "Atualizado às" });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error("Erro ao verificar as taxas:", error);
            message.reply(
                "Houve um erro ao verificar as taxas de envio na rede Solana.",
            );
        }
    },
};
