import "./App.css";
import { useState } from "react";
// import Place from "./components/Place";
import * as getBord from "./components/Place";
import React from "react";
import Scores from "./components/Scores";
import ButtonCom from "./components/ButtonCom";
import GridGame from "./GridGame.js";

var bord = getBord.bord;
const sizeBord = getBord.sizeBord;
var numClicked;

function App() {
  const [typePlayer, setTypePlayer] = useState("X");
  const [numsWinX, setNumsWinX] = useState(0);
  const [numsTie, setNumsTie] = useState(0);
  const [numsWinO, setNumsWinO] = useState(0);

  function handleClick() {
    if (typePlayer === "X") {
      setTypePlayer("O");
    } else {
      setTypePlayer("X");
    }

    numClicked = getBord.numClicked;
    if (numClicked === sizeBord) {
      resetGame(" TIE ", null);
      setNumsTie(numsTie + 1);
    } else {
      var retval = isWin(bord);
      if (retval === "X" || retval === "O") {
        resetGame("Congratulations " + retval + " won!", retval);
        if (retval === "X") setNumsWinX(numsWinX + 1);
        else setNumsWinO(numsWinO + 1);
      }
    }
  }

  function handleClickRESETgame() {
    bord = bord.map((element) => " ");
    // for (let i = 0; i < 9; i++) bord[i] = " ";
    localStorage.setItem(
      "bord",
      JSON.stringify([" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"])
    );
    localStorage.setItem("tie", "0");
    localStorage.setItem("scoreX", "0");
    localStorage.setItem("scoreO", "0");
    window.location.reload();
  }
  function handleClickSAVEgame() {
    console.log("sd");
    localStorage.setItem("bord", JSON.stringify(bord));
    localStorage.setItem("tie", JSON.stringify(numsTie));
    localStorage.setItem("scoreX", JSON.stringify(numsWinX));
    localStorage.setItem("scoreO", JSON.stringify(numsWinO));
  }

  return (
    <div className="App">
      <div className="heder">
        <div>
          <h1>The Tic Tok Toe game</h1>
        </div>
        <h2>Turn player: {typePlayer}</h2>
        <div className="bnt">
          <button-component name="reset" onClick={handleClickRESETgame}>
            <div slot="compButton">Reset</div>
          </button-component>
          <button-component name="save" onClick={handleClickSAVEgame}>
            <div slot="compButton">Save</div>
          </button-component>
        </div>
      </div>
      <div onClick={handleClick}>
        {/* <Place className="b1" name="0" player={typePlayer} />
        <Place className="b2" name="1" player={typePlayer} />
        <Place className="b3" name="2" player={typePlayer} />
        <Place className="b4" name="3" player={typePlayer} />
        <Place className="b5" name="4" player={typePlayer} />
        <Place className="b6" name="5" player={typePlayer} />
        <Place className="b7" name="6" player={typePlayer} />
        <Place className="b8" name="7" player={typePlayer} />
        <Place className="b9" name="8" player={typePlayer} /> */}
        <grid-game className="grid-game"></grid-game>
      </div>
      <div></div>

      <users-scores className="userScores">
        <div slot="px" value={numsWinX}>
          {numsWinX}
        </div>
        <div slot="tie" value={numsTie}>
          {numsTie}
        </div>
        <div slot="po" value={numsWinO}>
          {numsWinO}
        </div>
      </users-scores>
    </div>
  );
}

function isWin(bord1) {
  var win = true,
    player;
  const sqrtSizeBord = Math.sqrt(sizeBord, 2);
  //check if ther is a win in row
  for (let i = 0; i < sqrtSizeBord; i += sizeBord) {
    player = bord1[i];
    win = true;
    for (let j = i; j < sqrtSizeBord; j++) {
      if (bord1[j] !== player) win = false;
    }
    if (player !== " " && win === true) {
      return player;
    }
  }
  //check if ther is a win in colomn
  for (let i = 0; i < sqrtSizeBord; i++) {
    player = bord1[i];
    win = true;
    for (let j = i; j < sizeBord; j += sqrtSizeBord) {
      if (bord1[j] !== player) win = false;
    }
    if (player !== " " && win === true) {
      return player;
    }
  }
  //check if ther is a win in the main diagonal
  player = bord1[0];
  win = true;
  for (let i = 0; i < sizeBord; i += sqrtSizeBord + 1) {
    if (bord1[i] !== player) win = false;
  }
  if (player !== " " && win === true) {
    return player;
  }

  //check if ther is a win in the main diagonal
  player = bord1[sqrtSizeBord - 1];
  win = true;
  for (let i = sqrtSizeBord - 1; i < sizeBord; i += sqrtSizeBord - 1) {
    if (bord1[i] !== player) win = false;
  }
  if (player !== " " && win === true) {
    return player;
  }

  return "nobady";
}

function resetGame(msg) {
  alert(msg);
  for (let i = 0; i < sizeBord; i++) bord[i] = " ";
  localStorage.setItem(
    "bord",
    JSON.stringify([" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"])
  );
  bord[sizeBord] = "F";
}

export default App;
