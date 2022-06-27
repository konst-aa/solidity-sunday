const helpers = require("../js-helpers/ether-wrappers");

var HelloWorld = artifacts.require("HelloWorld.sol");
var Ballot = artifacts.require("Ballot.sol");

let b = ["apples", "cats", "dogs"]
b = b.map((element) => { return helpers.createBytes(element); });

module.exports = function (deployer) {
    deployer.deploy(Ballot, b)
    deployer.deploy(HelloWorld);
}