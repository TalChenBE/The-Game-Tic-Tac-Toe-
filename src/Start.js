import "./Start.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import CoinFlip from "./components/CoinFlip.js";
import * as getStartPlayer from "./components/CoinFlip";
import App from "./App";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

let typePlayer;
function Start() {
  function coinClick() {
    setTimeout(() => {
      typePlayer = getStartPlayer.player;
      console.log(typePlayer);
    }, 3200);
  }
  return (
    <div className="start">
      <div>
        <h1 className="title">The Tic Tac Toe game</h1>
      </div>
      <div onClick={coinClick}>
        <CoinFlip></CoinFlip>
      </div>
      <div
        className="link"
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

export default Start;
