import React, { useState } from "react";
import { ethers } from "ethers";
import Deapp_abi from "./abi.json";

const Deapp = () => {
  const contractAddress = "here you but the addr ";//this is the contract address
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  //this for ui to 

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  //this for ethers.js

  //this for connecting the metamask 
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };
  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
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

  const [StudentInfo, getStudentInfo] = useState(null);//this for setting the student info in ui to show it to the user

  const getAllStudentInfo = async () => {
    let val = await contract.getStudentInfo();
    getStudentInfo(val);
  };

  const setStudentInfo = (event) => {//this for setting the student name on the smart contract
    event.preventDefault();
    contract.setStudentsInfo(event.target.name.value);
    console.log(event.target.name.value); //for debugging
  };

  return (
    <div>
      <h1> simple DeApp For Student info </h1>
      <button onClick={connectWalletHandler}> {connButtonText} </button>
      {errorMessage}
      <h3> Address: {defaultAccount} </h3>
      <form onSubmit={setStudentInfo}>
        <label htmlFor="name"> name: </label> <input type="text" id="name" />
        <br />
        <button type={"submit"}> Send </button>
      </form>
      <button onClick={getAllStudentInfo}> Get all Student info </button>
      <h1> name: {StudentInfo}</h1>
    </div>
  );
};
export default Deapp;
