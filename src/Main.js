import "./Main.css";
import React, { useState } from "react";
import * as getBord from "./components/board/OnePlace";
import * as getFunction from "./components/board/OnePlace";
import Scores from "./components/Scores";
import ButtonCom from "./components/ButtonCom";
import GridGame from "./components/board/GridGame.js";
import PopupMsg from "./PopupMsg.js";

let bord = getBord.bord,
  namePlayer,
  numClicked,
  playerX = "X",
  playerO = "O";

const sizeBord = getBord.sizeBord;

function Main(props) {
  var initTie = JSON.parse(localStorage.getItem("tie"));
  var initScoreX = JSON.parse(localStorage.getItem("scoreX"));
  var initScoreO = JSON.parse(localStorage.getItem("scoreO"));

  var saveTie = JSON.parse(localStorage.getItem("saveTie")),
    savescoreX = JSON.parse(localStorage.getItem("SavescoreX")),
    savescoreO = JSON.parse(localStorage.getItem("SavescoreO"));

  const [typePlayer, setTypePlayer] = useState(props.typePlayer);
  const [numsWinX, setNumsWinX] = useState(savescoreX ?? initScoreX ?? 0);
  const [numsTie, setNumsTie] = useState(saveTie ?? initTie ?? 0);
  const [numsWinO, setNumsWinO] = useState(savescoreO ?? initScoreO ?? 0);

  function handleClick() {
    namePlayer = typePlayer;
    let flag = true;
    let index = getFunction.index;
    if (bord[index] === namePlayer) {
      if (namePlayer === playerX) {
        namePlayer = playerO;
      } else {
        namePlayer = playerX;
      }
      setTypePlayer(namePlayer);
    }

    numClicked = getFunction.numClicked;
    var retval = isWin(bord);
    if (retval === playerX || retval === playerO) {
      if (retval === playerX) {
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
    getFunction.setPlayerTypePlace(namePlayer);
  };
  React.useEffect(() => {
    window.addEventListener("click", listener);
  }, [namePlayer]);

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
    <div className="Main">
      <div className="heder">
        <div>
          <h1 className="title">The Tic Tac Toe game</h1>
        </div>

        <h2 className="title-turn">Turn player: {typePlayer}</h2>
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
          // player1={playerO}
          // player2={playerX}
          name={typePlayer}
          className="grid-game"
        >
          {/* <div slot="px" value={typePlayer}>
            {typePlayer}
          </div> */}
        </grid-game>
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

      {/* <PopupMsg></PopupMsg> */}
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

  //check if ther is a win in the second diagonal
  player = bord1[sqrtSizeBord - 1];
  win = true;
  for (
    let i = sqrtSizeBord - 1;
    i <= sqrtSizeBord * (sqrtSizeBord - 1);
    i += sqrtSizeBord - 1
  ) {
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

export default Main;
