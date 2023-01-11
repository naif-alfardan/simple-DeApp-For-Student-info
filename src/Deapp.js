import React, { useState } from "react";
import { ethers } from "ethers";
import Deapp_abi from "./abi.json";

const Deapp = () => {
  const contractAddress = "0xABd8b48406f6b76E2a574688027aE4Ed7c806Fe0";
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  //this for ui things

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null); //this for ethers.js

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        });
    } else {
      setErrorMessage("Need to install MetaMask!");
    }
  };
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };
  const updateEthers = () => {
    // let tempProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let tempContract = new ethers.Contract(
      contractAddress,
      Deapp_abi,
      tempSigner
    );
    setContract(tempContract);
  };
  const [StudentInfo, getStudentInfo] = useState(null);

  const getAllStudentInfo = async () => {
    let val = await contract.getStudentInfo();
    //create array take the result from the val and show it in the ui using map

    getStudentInfo(val);
  };
  const setStudentInfo = (event) => {
    event.preventDefault();
    contract.setStudentsInfo(event.target.name.value);
  };

  return (
    <div>
      <h1>simple DeApp For Student info</h1>
      <button onClick={connectWalletHandler}> {connButtonText}</button>
      <h3> Address: {defaultAccount} </h3>
      {errorMessage}
      <form onSubmit={setStudentInfo}>
        <label htmlFor="name">name:</label>
        <input type="text" id="name" />
        <br />
        <button type={"submit"}>Send </button>
      </form>
      <button onClick={getAllStudentInfo}>Get all Student info </button>
      <h1>name:{StudentInfo}</h1>
    </div>
  );
};
export default Deapp;
