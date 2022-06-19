import React, { useState } from "react";
import CountDown from "./countDown";

export default function HomePage() {
  const [count, setcount] = useState(0);
  const [popup, setPopup] = useState(false);
  const [shitCount, setShitCount] = useState(1);
  const [mintStart, setMintStart] = useState(false);
  const [outofshit, setOutofshit] = useState(false);
  const add = () => {
    if (shitCount == 2) {
      return alert("You can't add more than 2");
    }
    setShitCount(parseInt(shitCount) + 1);
  };

  const minus = () => {
    if (shitCount === 1) return;
    setShitCount(parseInt(shitCount) - 1);
  };
  const getShitText = () => {
    const futureDate = new Date(1655740800000);
    // const futureDate = new Date(1655651220000);
    if (outofshit) {
      return "Sorry we're out of shits";
    }
    if (futureDate > new Date()) {
      return "Shitting is not live";
    }

    return "Shitting is live";
  };

  return (
    <div className="home-page-parent">
      <div
        className="nav-bar"
        onClick={() => {
          if (popup) setPopup(false);
        }}
      >
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
      <div
        className="home-body center-div"
        onClick={() => {
          if (popup) setPopup(false);
        }}
      >
        <img src="/shitimages.png" alt="holy" className="holy-image pointer" />
        <p className="is-live">{getShitText()}</p>
        <img
          onClick={() => setPopup(true)}
          src="/shitbutton.png"
          alt="shit-button"
          className="shit-button pointer"
        />
        <p className="count">{count + " /4969"}</p>
      </div>

      {popup && (
        <div className="popup">
          <div className="popup-content">
            {!mintStart ? (
              <div className="div-center-vh">
                <CountDown
                  trigger2={(val) => {
                    setMintStart(val ?? false);
                  }}
                />
              </div>
            ) : (
              <>
                <p className="max-shit">Set your max shits</p>
                <div className="mint-control">
                  <span className="back-box" onClick={minus}>
                    <p className="minus">-</p>
                  </span>
                  <p>{shitCount}</p>
                  <span className="back-box" onClick={add}>
                    <p className="plus">+</p>
                  </span>
                </div>
                <p className="get-shit">Click here to get</p>
                <p className="shit-text">{">> shit"}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
