const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const menuScript = require("./menu.js"); // Importando o script do menu

module.exports = {
    name: "help",
    description: "Mostra informações frequentes sobre o Trojan no Solana",
    async execute(message, args, connection, wallets, walletsFile) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: "Solana Meme Coin" })
            .setTitle("Perguntas Frequentes")
            .setDescription(
                `
**Quais tokens posso negociar?**
Qualquer token SPL que seja negociável via Jupiter, incluindo pares SOL e USDC. Também suportamos negociações diretamente através do Raydium se o Jupiter não conseguir encontrar uma rota. Pode negociar pares recém-criados de SOL (não USDC) diretamente através do Raydium.

**Onde posso encontrar o meu código de referência?**
Abra o menu /start e clique em 💰 Referências.

**A minha transação expirou. O que aconteceu?**
Transações podem expirar quando há uma carga de rede elevada ou instabilidade. Isto é simplesmente a natureza da rede Solana atual.

**Quais são as taxas para utilizar o Trojan?**
Transações através do Trojan têm uma taxa de 1%, ou 0.9% se foi referido por outro utilizador. Não cobramos uma taxa de subscrição nem bloqueamos funcionalidades com pay-wall.

**O meu lucro líquido parece errado, porquê?**
O lucro líquido de uma negociação considera as taxas de transação da negociação. Confirme os detalhes da sua negociação em [Solscan.io](https://solscan.io) para verificar o lucro líquido.

**Quem é a equipa?**
O Trojan no Solana é desenvolvido e supervisionado pela Primordium Labs. Equipa principal: @mikebot3000 @TheDonDonnie @Reethmos.

**Perguntas adicionais ou precisa de suporte?**
Junte-se ao nosso grupo no Telegram [@trojan_on_solana](https://t.me/trojan_on_solana) e um dos nossos administradores poderá assisti-lo.
            `,
            )
            .addFields(
                {
                    name: "YouTube",
                    value: "[Trojan](https://www.youtube.com) Desenvolvido por e para Traders de Solana | @TrojanOnSolana",
                },
                {
                    name: "Twitter",
                    value: "[Comece a negociar](https://t.co/OjdUlFmSSn)\nDesenvolvido por e para Traders de Solana | @TrojanOnSolana",
                },
            )
            .setColor("#00b0f4")
            .setFooter({
                text: "Trojan no Solana",
                iconURL: "https://example.com/your-icon-url.png",
            }) // Adicione o URL do ícone aqui
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("back_button")
                .setLabel("Voltar")
                .setStyle(ButtonStyle.Primary),
        );

        const sentMessage = await message.reply({
            embeds: [embed],
            components: [row],
        });

        // Adicionando evento para lidar com a interação do botão "Voltar"
        const filter = (interaction) => interaction.customId === "back_button";
        const collector = sentMessage.createMessageComponentCollector({
            filter,
            time: 60000,
        });

        collector.on("collect", async (interaction) => {
            await menuScript.execute(interaction); // Executar o script do menu
        });

        collector.on("end", async () => {
            // Remover os componentes depois de 1 minuto
            row.components.forEach((component) => component.setDisabled(true));
            await sentMessage.edit({ components: [row] });
        });
    },
};
