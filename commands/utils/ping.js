const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Dá ping ao bot para ver a latência",
    async execute(message, args) {
        // Cria um objeto de mensagem de caixa (embed) inicial usando o EmbedBuilder
        const initialEmbed = new EmbedBuilder()
            .setAuthor({ name: "Solana Meme Coin" })
            .setColor('#0099ff')
            .setDescription("A dar ping...")
            .setFooter({
                text: "Bot Solana"
            })
            .setTimestamp();

        // Envia a mensagem inicial indicando que o ping está sendo processado
        const sentMessage = await message.reply({ embeds: [initialEmbed] });

        // Calcula a latência como a diferença entre o momento em que a mensagem foi enviada e o momento em que foi recebida
        const ping = sentMessage.createdTimestamp - message.createdTimestamp;

        // Cria um objeto de mensagem de caixa (embed) com os resultados do ping usando o EmbedBuilder
        const pingResultEmbed = new EmbedBuilder()
            .setAuthor({ name: "Solana Meme Coin" })
            .setColor('#0099ff')
            .setDescription(`A latência está a ${ping}ms.`)
            .setFooter({
                text: "Bot Solana"
            })
            .setTimestamp();

        // Edita a mensagem original com a resposta em caixa
        await sentMessage.edit({ embeds: [pingResultEmbed] });
    },
};
