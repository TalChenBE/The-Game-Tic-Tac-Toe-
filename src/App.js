import "./App.css";
import { useState, useEffect, useRef } from "react";
// import Place from "./components/Place";
import * as getBord from "./OnePlace";
import React from "react";
import Scores from "./components/Scores";
import ButtonCom from "./components/ButtonCom";
import GridGame from "./GridGame.js";
import OnePlace from "./OnePlace";

var bord = getBord.bord;

const sizeBord = getBord.sizeBord;
var numClicked;
// var namePlayer = "X";

function App() {
  const [typePlayer, setTypePlayer] = useState("X");
  const [numsWinX, setNumsWinX] = useState(0);
  const [numsTie, setNumsTie] = useState(0);
  const [numsWinO, setNumsWinO] = useState(0);

  const [try1, setTry1] = useState(true);

  // namePlayer = typePlayer;
  function handleClick() {
    let flag = true;
    if (typePlayer === "X") {
      setTypePlayer("O");
    } else {
      setTypePlayer("X");
    }

    numClicked = getBord.numClicked;
    var retval = isWin(bord);
    if (retval === "X" || retval === "O") {
      resetGame("Congratulations " + retval + " won!", retval);
      if (retval === "X") setNumsWinX(numsWinX + 1);
      else setNumsWinO(numsWinO + 1);
      flag = false;
    }
    if (numClicked === sizeBord && flag) {
      resetGame(" TIE ", null);
      setNumsTie(numsTie + 1);
    }
  }

  function handleClickRESETgame() {
    bord = bord.map(() => " ");
    bord[sizeBord] = "T";
    // for (let i = 0; i <sizeBord ; i++) bord[i] = " ";
    localStorage.setItem("bord", JSON.stringify(bord));
    localStorage.setItem("tie", "0");
    localStorage.setItem("scoreX", "0");
    localStorage.setItem("scoreO", "0");
    window.location.reload();
  }
  function handleClickSAVEgame() {
    localStorage.setItem("bord", JSON.stringify(bord));
    localStorage.setItem("tie", JSON.stringify(numsTie));
    localStorage.setItem("scoreX", JSON.stringify(numsWinX));
    localStorage.setItem("scoreO", JSON.stringify(numsWinO));
  }
  // const gridRef = useRef(0);

  // addEventListener("click", () => handleClickPlace());
  // function handleClickPlace() {
  //   console.log("click!");
  //}
  // gridRef.addEventListener("click", () => this.handleClickPlace());
  if (document.querySelector("grid-game") !== null)
    document.querySelector("grid-game").addEventListener("check", () => {
      console.log("123!!");
    });
  // useEffect(() => {
  //   gridRef.current.addEventListener("handleEventPlace", (ev) => {
  //     console.log("APP click!");
  //   });
  // });

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
          name={typePlayer}
          className="grid-game"
          onClick={handleClick}
          onClickPlace={() => {
            console.log("123123123");
          }}
          //ref={gridRef}
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
  // console.log(sqrtSizeBord);
  //check if ther is a win in row
  for (let i = 0; i < sqrtSizeBord; i += 3) {
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
  bord = bord.map(() => " ");
  bord[sizeBord] = "T";
  // for (let i = 0; i <sizeBord ; i++) bord[i] = " ";
  localStorage.setItem("bord", JSON.stringify(bord));
  bord[sizeBord] = "F";
}

// export { namePlayer };

export default App;
