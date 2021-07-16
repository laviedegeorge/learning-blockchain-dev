import React from "react";
import AdvanceStorageContract from "./contracts/AdvanceStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

// 0x5e7700ff2730Ad7D2c3ebA4C82B50705f1b23609

const App = () => {
  const [info, setInfo] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [state, setState] = React.useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const connectToWeb3Provider = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await AdvanceStorageContract.networks[networkId];
      const instance = await new web3.eth.Contract(
        AdvanceStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setState({ web3, accounts, contract: instance });
      await getAllIds(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const getAllIds = async (contractInstance) => {
    contractInstance.methods
      .getAllIds()
      .call()
      .then((res) => {
        setInfo(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addId = async (id) => {
    state.contract.methods
      .addId(id)
      .send({ from: state.accounts[0] })
      .then((res) => {
        if (res.transactionHash) {
          alert(`${value} added!!!`);
        }
      })
      .then(() => {
        getAllIds(state.contract);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const initializeApp = async () => {
    await connectToWeb3Provider();
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

  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="App">
      <header>
        <h1> Advance Storage</h1>
      </header>
      <h3>Data: {info.join(", ")}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addId(parseInt(value));
        }}
      >
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Set data (Number)"
        />
        <br />
        <button>Add ID</button>
      </form>

      <footer>
        <p>
          Logged in as:{" "}
          <a href="#">{state && shortenAddress(state.accounts[0])}</a>
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
