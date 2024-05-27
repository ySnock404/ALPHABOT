const { EmbedBuilder } = require('discord.js');
const { Connection, clusterApiUrl, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');
const crypto = require('crypto');
const { Buffer } = require('buffer');

// Configurações de criptografia
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

module.exports = {
    name: 'send',
    description: 'Envia SOL para uma carteira especificada na rede Solana.',
    async execute(message, args) {
        const userId = message.author.id;
        const recipientAddress = args[0];
        const amount = parseFloat(args[1]);

        // Carregar o banco de dados de carteiras
        const wallets = JSON.parse(fs.readFileSync('./wallets.json', 'utf8'));

        if (!wallets[userId] || !wallets[userId].secretKey || !wallets[userId].iv) {
            return message.reply('A chave secreta do remetente não está configurada.');
        }

        const senderSecretKeyEncrypted = wallets[userId].secretKey;
        const iv = Buffer.from(wallets[userId].iv, 'hex');

        if (!recipientAddress || isNaN(amount)) {
            return message.reply('Por favor, forneça um endereço de carteira válido e a quantia em SOL a ser enviada.');
        }

        try {
            // Descriptografar a chave secreta
            const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
            let decrypted = decipher.update(Buffer.from(senderSecretKeyEncrypted, 'hex'));
            decrypted = Buffer.concat([decrypted, decipher.final()]);

            const senderKeypair = Keypair.fromSecretKey(decrypted);

            const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
            const recipientPublicKey = new PublicKey(recipientAddress);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: senderKeypair.publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            );

            const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

            const embed = new EmbedBuilder()
                .setTitle('Transação Enviada!')
                .setDescription(`SOL enviado com sucesso para a carteira: ${recipientAddress}`)
                .addFields(
                    { name: 'Quantia Enviada', value: `${amount} SOL` },
                    { name: 'Assinatura da Transação', value: `${signature}` }
                )
                .setColor(0x00AE86)
                .setTimestamp();

            message.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao enviar SOL:', error);
            message.reply(`Houve um erro ao enviar SOL: ${error.message}. Verifique se você tem saldo suficiente e se o endereço está correto.`);
        }
    },
};
