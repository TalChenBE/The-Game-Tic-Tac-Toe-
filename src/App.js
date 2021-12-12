import "./App.css";
import React from "react";
import { useState } from "react";
import CoinFlip from "./components/CoinFlip.js";
import * as getStartPlayer from "./components/CoinFlip";
import Main from "./Main";
import ReactDOM from "react-dom";

let typePlayer;

function App() {
  const [show, setShow] = useState(false);
  function coinClick() {
    setTimeout(() => {
      typePlayer = getStartPlayer.player;
      console.log(typePlayer);
      setShow(true);
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
        className="link"
        onClick={() => {
          handleClick(typePlayer);
        }}
        style={{ display: show ? "block" : "none" }}
      >
        Start Playing
      </div>
    </div>
  );
}
const handleClick = (typePlayer) => {
  ReactDOM.render(
    <React.StrictMode>
      <Main typePlayer={typePlayer} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

export default App;
