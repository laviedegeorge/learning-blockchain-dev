const AdvanceStorage = artifacts.require("./AdvanceStorage.sol");

contract("AdvanceStorage", () => {
  let advanceStorage = null;

  before(async () => {
    advanceStorage = await AdvanceStorage.deployed();
  });

  it("Should add an element to the array", async () => {
    await advanceStorage.addId(54);
    const result = await advanceStorage.ids(0);
    assert(result.toNumber() === 54);
  });

  it("Should get an element from the array", async () => {
    await advanceStorage.addId(60);
    const result = await advanceStorage.getId(1);
    assert(result.toNumber() === 60);
  });

  it("Should get the Ids array", async () => {
    const result = await advanceStorage.getAllIds();
    const idsArr = result.map((id) => id.toNumber());
    assert.deepStrictEqual(idsArr, [54, 60]);
  });

  it("should get the length of the Ids array", async () => {
    const result = await advanceStorage.length();
    assert(result.toNumber() === 2);
  });
});
