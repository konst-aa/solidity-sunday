const ethers = require('ethers');

var HelloWorld = artifacts.require("HelloWorld.sol");
var Ballot = artifacts.require("Ballot.sol");

let b = ["apples", "cats", "dogs"]
b = b.map((element) => { return createBytes(element); });

function createBytes(string) {
    return ethers.utils.formatBytes32String(string);
}
function parseBytes(bytes) {
    return ethers.utils.parseBytes32String(bytes)
}

module.exports = function (deployer) {
    deployer.deploy(Ballot, b)
    deployer.deploy(HelloWorld);
}