import "./App.css";
import { useState, useEffect, useRef } from "react";
import * as getBord from "./components/OnePlace";
import React from "react";
import Scores from "./components/Scores";
import ButtonCom from "./components/ButtonCom";
import GridGame from "./components/GridGame.js";
import OnePlace from "./components/OnePlace";
import * as getFunc from "./components/OnePlace";

var bord = getBord.bord,
  typePlayer = "X",
  numClicked;
const sizeBord = getBord.sizeBord;

function App() {
  var initTie = JSON.parse(localStorage.getItem("tie"));
  var initScoreX = JSON.parse(localStorage.getItem("scoreX"));
  var initScoreO = JSON.parse(localStorage.getItem("scoreO"));

  var saveTie = JSON.parse(localStorage.getItem("saveTie")),
    savescoreX = JSON.parse(localStorage.getItem("SavescoreX")),
    savescoreO = JSON.parse(localStorage.getItem("SavescoreO"));

  const [player, setPlayer] = useState("X");
  const [numsWinX, setNumsWinX] = useState(savescoreX ?? initScoreX ?? 0);
  const [numsTie, setNumsTie] = useState(saveTie ?? initTie ?? 0);
  const [numsWinO, setNumsWinO] = useState(savescoreO ?? initScoreO ?? 0);

  function handleClick() {
    let flag = true;
    let index = getFunc.index;
    if (bord[index] === typePlayer) {
      if (typePlayer === "X") {
        typePlayer = "O";
        setPlayer("O");
      } else {
        typePlayer = "X";
        setPlayer("X");
      }
    }

    numClicked = getBord.numClicked;
    var retval = isWin(bord);
    if (retval === "X" || retval === "O") {
      if (retval === "X") {
        resetGame(
          `Congratulations ${retval} won!`,
          numsWinX + 1,
          numsTie,
          numsWinO
        );
        setNumsWinX(numsWinX + 1);
      } else {
        resetGame(
          `Congratulations ${retval} won!`,
          numsWinX,
          numsTie,
          numsWinO + 1
        );
        setNumsWinO(numsWinO + 1);
      }
      flag = false;
    }
    if (numClicked === sizeBord && flag) {
      resetGame(" TIE ", numsWinX, numsTie + 1, numsWinO);
      setNumsTie(numsTie + 1);
    }
  }

  const listener = () => {
    getFunc.setPlayerTypePlace(typePlayer);
  };
  React.useEffect(() => {
    window.addEventListener("click", listener);
  }, [typePlayer]);

  function handleClickRESETgame() {
    bord = bord.map(() => " ");
    bord[sizeBord] = "T";
    setNumsWinX(0);
    setNumsTie(0);
    setNumsWinO(0);
    localStorage.clear();
    window.location.reload();
  }
  function handleClickSAVEgame() {
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
      <div className="bord" onClick={handleClick}>
        <grid-game
          id="gridi"
          name={typePlayer}
          className="grid-game"
        ></grid-game>
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
  for (let i = 0; i < sizeBord; i += sqrtSizeBord) {
    player = bord1[i];
    win = true;
    for (let j = 0; j < sqrtSizeBord; j++) {
      if (bord1[j + i] !== player) win = false;
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
  for (let i = sqrtSizeBord - 1; i < sqrtSizeBord * 2; i += sqrtSizeBord - 1) {
    if (bord1[i] !== player) win = false;
  }
  if (player !== " " && win === true) {
    return player;
  }

  return "nobady";
}

function resetGame(msg, numsWinX, numsTie, numsWinO) {
  alert(msg);
  bord = bord.map(() => " ");
  bord[sizeBord] = "T";
  localStorage.setItem("bord", JSON.stringify(bord));
  bord[sizeBord] = "F";
  numClicked = 0;
  localStorage.setItem("SavescoreX", JSON.stringify(numsWinX));
  localStorage.setItem("saveTie", JSON.stringify(numsTie));
  localStorage.setItem("SavescoreO", JSON.stringify(numsWinO));

  window.location.reload();
}

export default App;
