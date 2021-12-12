import "./App.css";
import React from "react";
import { useState } from "react";
import CoinFlip from "./components/CoinFlip.js";
import Main from "./Main";
import ReactDOM from "react-dom";
import ButtonCom from "./components/ButtonCom";

function App() {
  const [show, setShow] = useState(false);
  const [typePlayer, setTypePlayer] = useState("X");

  function coinClick() {
    setTimeout(() => {
      setShow(true);
    }, 3200);
  }
  function handleClickRESTOREgame() {
    handleClick(typePlayer);
  }
  return (
    <div className="App">
      <div>
        <h1 className="title">The Tic Tac Toe game</h1>
      </div>

      <div onClick={coinClick}>
        <CoinFlip
          changePlayer={(typePlayer) => setTypePlayer(typePlayer)}
        ></CoinFlip>
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
