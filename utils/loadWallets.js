const fs = require("fs");

function loadWallets(walletsFile) {
    let wallets = {};

    if (fs.existsSync(walletsFile)) {
        wallets = JSON.parse(fs.readFileSync(walletsFile));
    }

    return wallets;
}

module.exports = { loadWallets };
