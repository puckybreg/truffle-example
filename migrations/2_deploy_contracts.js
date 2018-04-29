var SimpleStorage = artifacts.require("../contracts/agPay.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
