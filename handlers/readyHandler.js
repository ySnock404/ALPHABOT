const chalk = require("chalk");

module.exports = async (client) => {
    console.log(chalk.green(`Logged in as ${client.user.tag}!`));

    // Enviar mensagem ao canal específico quando o bot se conecta
    const channelId = "1244380002481340508"; // ID do canal onde a mensagem será enviada
    const channel = client.channels.cache.get(channelId);
    if (channel) {
        channel.send(
            ":green_circle: **Tou vivo** ... ainda não foi desta que morri de vez",
        );
    } else {
        console.error(chalk.red(`Canal com ID ${channelId} não encontrado.`));
    }

    // Fetch and cache guild members with presence information
    for (const [guildId, guild] of client.guilds.cache) {
        try {
            await guild.members.fetch();
            const onlineCount = guild.members.cache.filter(
                (member) => member.presence?.status === "online",
            ).size;
            console.log(
                chalk.blue(
                    `No servidor ${guild.name}, há ${onlineCount} pessoas online.`,
                ),
            );
        } catch (error) {
            console.error(
                chalk.red(
                    `Erro ao buscar membros no servidor ${guild.name}: ${error.message}`,
                ),
            );
        }
    }

    const commandNames = client.commands
        .map((command) => command.name)
        .join(", ");
    console.log(chalk.yellow(`Comandos disponíveis: ${commandNames}`));
};
