const { Connection, clusterApiUrl } = require("@solana/web3.js");

function createSolanaConnection() {
    return new Connection(clusterApiUrl("mainnet-beta"));
}

module.exports = { createSolanaConnection };
