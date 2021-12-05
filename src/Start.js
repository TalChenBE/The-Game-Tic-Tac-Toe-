import "./App.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import CoinFlip from "./components/CoinFlip.js";
import * as getStartPlayer from "./components/CoinFlip";
import App from "./App";
import ReactDOM from "react-dom";

export default function Start() {
  let typePlayer;
  function coinClick() {
    setTimeout(() => {
      typePlayer = getStartPlayer.player;
    }, 3200);
  }

  return (
    <div className="App">
      <div>
        <h1 className="title">The Tic Tac Toe game</h1>
      </div>
      <div onClick={coinClick}>
        <CoinFlip></CoinFlip>
      </div>
      <div
        onClick={() => {
          handleClick(typePlayer);
        }}
      >
        Start Playing
      </div>
    </div>
  );
}
const handleClick = (typePlayer) => {
  ReactDOM.render(
    <React.StrictMode>
      <App typePlayer={typePlayer} />
    </React.StrictMode>,

    document.getElementById("root")
  );
};

// export { typePlayer };
// export default Start;
