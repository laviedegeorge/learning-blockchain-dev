var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};

const HelloWorld = artifacts.require("./HelloWorld.sol");

module.exports = function (deployer) {
  deployer.deploy(HelloWorld);
};
