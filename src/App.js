import "./App.css";
import { useState } from "react";
import Place from "./components/Place";
import * as getPlace from "./components/Place";
import React from "react";
import Scores from "./components/Scores";
import ButtonCom from "./ButtonCom";

const bord = getPlace.bord;
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

    numClicked = getPlace.numClicked;
    if (numClicked === 9) {
      resetGame(" TIE ", null);
      setNumsTie(numsTie + 1);
    } else {
      var retval = isWin([
        [bord[0], bord[1], bord[2]],
        [bord[3], bord[4], bord[5]],
        [bord[6], bord[7], bord[8]],
      ]);
      if (retval === "X" || retval === "O") {
        resetGame("Congratulations " + retval + " won!", retval);
        if (retval === "X") setNumsWinX(numsWinX + 1);
        else setNumsWinO(numsWinO + 1);
      }
    }
  }

  function handleClickRESETgame() {
    for (let i = 0; i < 9; i++) bord[i] = " ";
    localStorage.setItem(
      "bord",
      JSON.stringify([" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"])
    );
    window.location.reload();
  }

  return (
    <div className="App">
      <div className="heder">
        <div>
          <h1>The Tic Tok Toe game</h1>
        </div>
        <h2>Turn player: {typePlayer}</h2>
        <div className="bnt">
          {/* <ButtonCom-game classname="saveGame" name="save">
            <div slot="saveGame">Save</div>
          </ButtonCom-game> */}

          <Button-Component name="reset" onClick={handleClickRESETgame}>
            <div slot="resetGame">Reset</div>
          </Button-Component>
        </div>
      </div>
      <div className="bord" onClick={handleClick}>
        <Place className="b1" name="0" player={typePlayer} />
        <Place className="b2" name="1" player={typePlayer} />
        <Place className="b3" name="2" player={typePlayer} />
        <Place className="b4" name="3" player={typePlayer} />
        <Place className="b5" name="4" player={typePlayer} />
        <Place className="b6" name="5" player={typePlayer} />
        <Place className="b7" name="6" player={typePlayer} />
        <Place className="b8" name="7" player={typePlayer} />
        <Place className="b9" name="8" player={typePlayer} />
      </div>
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

  //check if ther is a win in row
  for (let i = 0; i < 3; i++) {
    player = bord1[i][0];
    win = true;
    for (let j = 0; j < 3; j++) {
      if (bord1[i][j] !== player) win = false;
    }
    if (player !== " " && win === true) {
      return player;
    }
  }
  //check if ther is a win in colomn
  for (let i = 0; i < 3; i++) {
    player = bord1[0][i];
    win = true;
    for (let j = 0; j < 3; j++) {
      if (bord1[j][i] !== player) win = false;
    }
    if (player !== " " && win === true) {
      return player;
    }
  }
  //check if ther is a win in diagonal
  player = bord1[1][1];
  if (bord1[0][0] === player && player === bord1[2][2] && player !== " ") {
    return bord1[0][0];
  }

  if (bord1[0][2] === player && player === bord1[2][0] && player !== " ") {
    return bord1[0][2];
  }
  return "nobady";
}

function resetGame(msg) {
  alert(msg);
  for (let i = 0; i < 9; i++) bord[i] = " ";
  localStorage.setItem(
    "bord",
    JSON.stringify([" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"])
  );
  bord[9] = "F";
}

export default App;
