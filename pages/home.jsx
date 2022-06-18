import React, { useState } from "react";

export default function HomePage() {
  const [count, setcount] = useState(0);
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
          className="shit-button pointer"
        />
        <p className="count">{count + " /4969"}</p>
      </div>
    </div>
  );
}
