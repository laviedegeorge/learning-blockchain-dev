const HelloWorld = artifacts.require("./HelloWorld.sol");

contract("HelloWorld", () => {
  it("should return hello world", async () => {
    const helloWorldInstance = await HelloWorld.deployed();
    const result = await helloWorldInstance.hello();
    assert(result === "Hello World");
  });
});
