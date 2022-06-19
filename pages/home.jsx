import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractabi from "./abi.json";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

export default function HomePage() {
  // const [count, setcount] = useState(0);

  // 
  // 
  // Contract Integration constants
  // 
  // 
  const [wallets, setWallets] = useState("");
  const [currentMintCount, setCurrentMintCount] = useState(4969);
  const [walletAddress, setWalletAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [chainId, setChainId] = useState(1);

  // Google analytics constants
  const gaWalletTracker = useAnalyticsEventTracker("wallet");
  const gaMintTracker = useAnalyticsEventTracker("mint");
  const gaOtherTracker = useAnalyticsEventTracker("others");

  // 
  // 
  // End of Contract Integration constants
  // 
  // 

  // 
  // 
  // 
  // Contract Integration
  //
  //
  // 
  //  
  useEffect(() => {
    setTimeout(() => {
      if (
        window?.ethereum &&
        window?.ethereum?.selectedAddress &&
        wallets === ""
      ) {
        setWallets(window.ethereum.selectedAddress.slice(-4));
        setWalletAddress(window?.ethereum?.selectedAddress);
      }
    }, 1000);
    setTimeout(() => {
      mintCount();
    }, 2000);
  }, []);

  async function requestAccount(showError) {
    const alertMessage = showError ?? true;
    if (window.ethereum) {
      if (wallets !== "") {
        if (alertMessage) alert("Wallet already connected");
        return;
      }
      gaWalletTracker("new-wallet");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        mintCount();
        getChainId();
        // setWalletText(true);
        gaWalletTracker("wallet-connected");
        setWallets(accounts[0].slice(-4));
        console.log(accounts[0]);
        setWalletAddress(accounts[0]);
      } catch (error) {
        // console.log("Error connecting....");
        alert(error);
      }
    } else {
      //console.log("Metamask not detected");
      gaWalletTracker("no-metamask");
      alert("Metamask not detected");
    }
  }

  const getChainId = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const { chainId } = await provider.getNetwork();
      console.log("chainId", chainId);
      // setChainId(chainId);

      if (chainId !== 1) {
        alert("Please connect to Ethereum Mainnet");
      }
    } catch (error) {
      console.log("Error connecting....");
    }
  };

  const getContract = () => {
    try {
      const contractAddress = "0x5280AfbEA20f40b3d18Efe0FcD090C31eb7F5968";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractabi,
        signer
      );
      // console.log("contract", contract);
      return contract;
    } catch (error) {
      console.log("error", error);
    }
  };

  const mintCount = async () => {
    // const TotalMinted = await getContract().suppliedNFTs();

    if (!window.ethereum) {
      //alert("Metamask not detected");
      console.log("Metamask not detected");
      return;
    }

    try {
      const TotalMinted = await getContract().totalSupply();
      console.log("totalMinted", TotalMinted);
      console.log(parseInt(TotalMinted._hex, 16));
      try {
        let count = parseInt(TotalMinted._hex, 16);
        setCurrentMintCount(count);
        if (count >= 3769) {
          setSoldOut(true);
        }
      } catch (error) {
        setCurrentMintCount(400);
      }

      // setCurrentMintCount(3769);
    } catch (err) {
      console.log("mintcount error", err);
    }
  };

  const mintToken = async () => {
    // const connection = contract.connect(signer);
    // const addr = connection.address;
    // const supply = await contract.suppliedNFTs();
    // setSupply(supply);
    try {
      if (quantity < 1) {
        alert("Please enter valid quantity");
        return;
      }
      getContract()
        .mint(quantity, {
          value: ethers.utils.parseEther("0"),
        })
        .then((val) => {
          alert("Token minted successfully");
          // console.log("val", val);
          // console.log("error", error);
        })
        .catch((error) => {
          // console.log("error", error);
          // console.table(error);
          console.log(error.reason);
          alert(error.reason);
          // console.log("errortp", typeof error);
          // console.log("errorm", error.message);
        });
    } catch (error) {
      console.log("error91", error?.reason);
    }

    //console.log(result);
  };

  const clickedMint = () => {
    requestAccount(false);
    getChainId();
    mintToken();
  };
   
  // 
  // 
  // 
  // End Of Contract Integration
  // 
  // 
  // 
  // 
  return (
    <div className="home-page-parent">
      <div className="nav-bar">
        <div className="nav-bar-left">
          <h1 className="heading">Holy Shit</h1>
        </div>
        <div className="nav-bar-right">
          <img src="/opensea.png" alt="openSea" className="openSea pointer" />
          <img
            src="/etherscan.png"
            alt="etherScan"
            className="etherScan pointer"
          />
        </div>
      </div>
      <div className="home-body center-div">
        <img src="/shitimages.png" alt="holy" className="holy-image pointer" />
        <p className="is-live">Shitting is live</p>
        <img
          src="/shitbutton.png"
          alt="shit-button"
          onClick={clickedMint}
          className="shit-button pointer"
        />
        <p className="count">{currentMintCount + " /4969"}</p>
      </div>
    </div>
  );
}
