import $ from "jquery";
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
      } else {
        $("#coin").addClass("tails");
        player = playerO;
      }
    }, 100);
  });
});

function CoinFlip(props) {
  return (
    <div className="coinFlip">
      <h2>Click on the coin to determine who will play first</h2>
      <div
        id="coin"
        onClick={() =>
          setTimeout(function () {
            props.changePlayer(player);
          }, 101)
        }
      >
        <div className="side-a">X</div>
        <div className="side-b">O</div>
      </div>
    </div>
  );
}
export default CoinFlip;
