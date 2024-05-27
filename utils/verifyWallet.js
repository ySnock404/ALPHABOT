const { PublicKey, Connection } = require("@solana/web3.js");

async function verifyWalletCanReceiveSOL(walletAddress, connection) {
    try {
        const publicKey = new PublicKey(walletAddress);
        const accountInfo = await connection.getAccountInfo(publicKey);
        return accountInfo !== null; // Se a conta existir, pode receber SOL
    } catch (error) {
        console.error(
            "Erro ao verificar se a carteira pode receber SOL:",
            error,
        );
        return false;
    }
}

module.exports = { verifyWalletCanReceiveSOL };
