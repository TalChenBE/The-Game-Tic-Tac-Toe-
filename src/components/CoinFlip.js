import $ from "jquery";
import { useState } from "react";

import "./CoinFlip.css";

let player,
  playerX = "X",
  playerO = "O";

$(document).ready(function ($) {
  $("#coin").on("click", function () {
    var flipResult = Math.random();
    $("#coin").removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        player = playerX;
        console.log("it is head ~ " + player);
      } else {
        $("#coin").addClass("tails");
        player = playerO;
        console.log("it is tails ~ " + player);
      }
    }, 100);
  });
});

function CoinFlip(props) {
  return (
    <div className="coinFlip">
      <h2>Click on the coin to determine who will play first</h2>
      <div id="coin">
        <div className="side-a">X</div>
        <div className="side-b">O</div>
      </div>
    </div>
  );
}
export { player };
export default CoinFlip;
