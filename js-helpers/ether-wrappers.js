const ethers = require('ethers');

module.exports = {
    createBytes(string) {
        return ethers.utils.formatBytes32String(string);
    },
    parseBytes(bytes) {
        return ethers.utils.parseBytes32String(bytes)
    }
}