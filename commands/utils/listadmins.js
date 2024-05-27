const adminsData = require("../admins.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "listadmins",
    description: "Lista todos os administradores",
    execute(message) {
        const { admins } = adminsData;

        // Verifica se existem administradores
        if (admins.length === 0) {
            return message.channel.send("Não há administradores configurados.");
        }

        // Formata a lista de administradores com números
        const adminList = admins.map((admin, index) => `${index + 1}. <@${admin.id}>`).join("\n");

        // Constrói o objeto de incorporação (embed)
        const embed = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Lista de Administradores")
            .setDescription(adminList)
            
            .setFooter({ text: "Bot - Lista de Administradores" }) // Define o rodapé como um objeto«
            .setTimestamp()

        // Envia a mensagem de incorporação (embed)
        message.channel.send({ embeds: [embed] });
    },
};
