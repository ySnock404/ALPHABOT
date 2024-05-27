const web3 = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID, Token } = require('@solana/spl-token');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'coin',
    description: 'Busca informações sobre um token na blockchain Solana.',
    async execute(message, args) {
        const tokenAddress = args[0];
        if (!tokenAddress) {
            return message.reply('Por favor, forneça o endereço do token.');
        }

        const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

        try {
            const token = new Token(
                connection,
                new web3.PublicKey(tokenAddress),
                TOKEN_PROGRAM_ID,
                new web3.Account() // Você pode precisar ajustar isso se precisar de uma conta para a autenticação
            );

            const tokenInfo = await token.getMintInfo();
            const tokenName = tokenInfo.name ? tokenInfo.name : 'Nome não disponível';

            const embed = new EmbedBuilder()
                .setTitle(`${tokenName} - Informações do Token`)
                .setDescription(`Nome: **${tokenName}**`)
                .setFooter({ text: 'Informações obtidas da blockchain Solana' });

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao buscar informações do token:', error);
            message.reply('Houve um erro ao buscar informações. Verifique se o endereço do token está correto e acessível na rede Solana.');
        }
    },
};