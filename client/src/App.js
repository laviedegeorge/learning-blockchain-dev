import React from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import "./App.css";
import getWeb3 from "./getWeb3";
import HelloWorldContract from "./contracts/HelloWorld.json";

const App = () => {
  const [state, setState] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const connectToWeb3Provider = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const instance = await new web3.eth.Contract(
        HelloWorldContract.abi,
        "0xf9d18d9cC78F97188423Cd258eE9271c1461d3bD"
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const shortenAddress = (address) => {
    try {
      const addressArr = (address || "").split("");
      const firstPart = addressArr.splice(0, 6).join("");
      const secondPart = addressArr
        .splice(addressArr.length - 4, addressArr.length - 1)
        .join("");
      const shortAddress = `${firstPart}...${secondPart}`;
      return shortAddress;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const sayHello = () => {
    state.contract.methods
      .hello()
      .call()
      .then((res) => {
        setValue(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initializeApp = async () => {
    await connectToWeb3Provider();
  };

  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="App">
      <header>
        <h1> 1st smart contract </h1>
      </header>
      <button onClick={() => sayHello()}>
        Say Hello world from a Smart contract in solidity
      </button>
      <p>My smart contract says: {value}</p>
      <footer>
        <p>
          Logged in as:{" "}
          <span>{state && shortenAddress(state.accounts[0])}</span>
        </p>
        <p>
          {" "}
          Built by <a href="https://github.com/laviedegeorge">
            laviedegeorge
          </a>{" "}
        </p>
      </footer>
    </div>
  );
};

export default App;
