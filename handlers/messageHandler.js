module.exports = async (
    message,
    client,
    connection,
    wallets,
    walletsFile,
    admins,
) => {
    const { default: chalk } = await import("chalk");

    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const userName = message.author.tag;
    const userId = message.author.id;

    console.log(
        chalk.magenta(`Comando recebido: ${commandName} por ${userName}`),
    );

    if (!client.commands.has(commandName)) {
        console.log(chalk.red(`Comando não encontrado: ${commandName}`));
        return;
    }

    const command = client.commands.get(commandName);
    const isAdmin = admins.some(admin => admin.id === userId);
    
    // Check if the command requires admin permissions
    const adminCommands = ["refresh", "anotherAdminCommand"]; // List of admin-only commands
    if (adminCommands.includes(commandName) && !isAdmin) {
        console.log(chalk.red(`Acesso negado: ${commandName} por ${userName}`));
        message.reply("Não tens permissão para usar este comando.");
        return;
    }

    try {
        console.log(
            chalk.cyan(`Executando comando: ${command.name} por ${userName}`),
        );
        await command.execute(message, args, connection, wallets, walletsFile);
        console.log(
            chalk.green(
                `Comando executado com sucesso: ${command.name} por ${userName}`,
            ),
        );
    } catch (error) {
        console.error(
            chalk.red(
                `Erro ao executar comando: ${command.name} por ${userName}`,
            ),
        );
        console.error(error);
        message.reply("Houve um erro ao tentar executar esse comando!");
    }
};

