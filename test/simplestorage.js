const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", (accounts) => {
  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.setData("george", { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.getData.call();

    assert.equal(storedData, "george", "The value 89 was not stored.");
  });
});
